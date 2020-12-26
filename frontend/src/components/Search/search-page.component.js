import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./search.css";
import "./searchbar.css";
import './newsbar.scss'
import Navbar from "../NavBar/navbar.component";
import requests from '../functions/requests.js';
import helper from "../functions/helper.js";

import SelectSearch from 'react-select-search';
import Axios from 'axios';
import queryString from 'query-string'

export default class Search extends Component{

    constructor(props){
        super(props);

        this.onChangeOrderShares = this.onChangeOrderShares.bind(this);
        this.onChangeOrderOffer = this.onChangeOrderOffer.bind(this);
        this.onOrderSubmit = this.onOrderSubmit.bind(this);
        
        this.onChangeEsAmount = this.onChangeEsAmount.bind(this);
		this.onChangeEsParameter = this.onChangeEsParameter.bind(this);
		this.onChangeEsType = this.onChangeEsType.bind(this);
        this.onEsSubmit = this.onEsSubmit.bind(this);
        this.onAddWatchlist = this.onAddWatchlist.bind(this);
		this.handleChange = this.handleChange.bind(this);
		
		this.onChangeValueStartDay = this.onChangeValueStartDay.bind(this);
		this.onChangeValueEndDay = this.onChangeValueEndDay.bind(this);
		this.onSubmitValueHistory = this.onSubmitValueHistory.bind(this);

		this.onChangeStartDay = this.onChangeStartDay.bind(this);
		this.onChangeEndDay = this.onChangeEndDay.bind(this);
		this.onSubmitHistory = this.onSubmitHistory.bind(this);


        this.state = {
            userID: "",
            userFunds: 0,
            stockID: null,

            stocks:[],
            stockList:[],
            stocksOwned: [],
            owned:null,

            watchlists: [],
            selectedList: null,

			stockHistory: [],
			stockValueHistory: [],

			stockNews: [],

			valueHistoryStartDay: '',
			valueHistoryEndDay: '',

			tranHistoryStartDay:'',
			tranHistoryEndDay: '',

            shares: 0,
            price: 0,

			esParameter: 'incPrcnt',
			esType: 'Bid',
            esAmount: 0,

            ask: 'N/A',
            bid: 'N/A',

            currentBid: 'N/A',
            currentAsk: 'N/A',
            
            openingBid: 'N/A',
            openingAsk: 'N/A',
            
        }
    }


    componentDidMount() {
        console.log('reloaded /search');
    } 

	async componentWillReceiveProps(props){
        this.setState({
            userFunds: props.user.userFunds,
            userID: props.user._id,
            stocksOwned: props.user.stockPortfolio,

        })

		if(queryString.parse(this.props.location.search).stock == undefined){
			console.log("nothing");
		}
		else{
			this.handleChange(queryString.parse(this.props.location.search).stock)
			console.log();
		}

        var parsedList = await (requests.parseListItems(props.user._id));
        var stockParsedList = await (requests.parseStockItems());

		console.log(stockParsedList);

        this.setState({
            watchlists : parsedList,
            stockList: stockParsedList,
        });

    } 

    onChangeOrderShares(e){
        this.setState({
            shares: e.target.value
        });
        console.log(this.state.shares);
    }

    async onChangeOrderOffer(e){
        this.setState({
            price: e.target.value
        });

        console.log("Price: " + this.state.price)
    }
    //creating buy order
    //need to add axios post sending the order to the stock
    //need to delete order from both in case of failure (we should make a function for that..?)
    //no pop up programmed confirming to the user that a buy order has been, or displaying order


    async onOrderSubmit(e){
        e.preventDefault();

        if(this.state.stockID==null || this.state.stockID==""){
            alert("Please select a stock")
        }else{
            
            var orderTotal = Number(this.state.price)*Number(this.state.shares);
            
            console.log("User funds: " + this.state.userFunds)

            if (this.state.userFunds >= orderTotal && this.state.price > 0 && this.state.shares > 0){
                var newUserFunds = Number(this.state.userFunds) - orderTotal;
                console.log("Order Total: "+ orderTotal);
                var ID = await (requests.generateBuyID(this.state.stockID, this.state.userID));

                console.log("Stock on order: " + this.state.stockID);

                axios.all([
               
                    axios({
                        method: 'post',
                        url: 'http://localhost:5000/update/' + this.state.userID + "/" + this.state.stockID+"/buyorder/add", 
                        data: {
                            orderID: ID,
                            stockID: this.state.stockID,
                            shares: Number(this.state.shares),
                            price: Number(this.state.price)
                        },
                        headers: {
                            Authorization: "Bearer " + localStorage.getItem("token")
                        }
                    }),
    
                ])
                .then(res => {
                    // console.log(res.data)
                    //i want a function for this.
                    alert('ORDER: \n' +
                    this.state.stockID + ' \n' + 
                    '$' + this.state.price +'/Share \n' +
                    'Shares: ' + this.state.shares + '\n' +
                    'Placed Successfully!')

                    window.location.reload(false);
                })
                .catch(res => {
                    console.log(res)
                    alert('Something went wrong! Please try again later.')
                    window.location.reload(false);
                });

            }
            else{
                if(this.state.userFunds < orderTotal){
                    alert("you broke. go home");
                }
            }
        }
    }

    onChangeEsParameter(e){
        this.setState({
            esParameter: e.target.value        
        });
	}
	
	onChangeEsType(e){
        this.setState({
            esType: e.target.value        
        });
    }

    onChangeEsAmount(e){
        this.setState({
            esAmount: e.target.value        
        });
        console.log(this.state.stockID);
    }

    async onEsSubmit(e){
        e.preventDefault();
        if(this.state.esParameter !=null && this.state.esAmount != null && this.state.esAmount != 0 && this.state.stockID != null && this.state.stockID != ''){
            
            var ID = await (requests.generateESID(this.state.stockID, this.state.userID));
			console.log(this.state.esType);
            axios({
                method: 'post',
                url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.stockID+'/ES/add', 
                data: {
                    subscriptionID: ID,
                    parameter: this.state.esParameter,
                    value: this.state.esAmount,
					triggerOrder: true,
					type: this.state.esType,
					notifSent: 0
				},
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
            })
            .then(res => {
                console.log(res.data)
                alert("Successfully created ES")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("ES creation failed. Please try again.");
            })
		}
		else{
			alert("No stock selected");
		}
        //window.location.reload(false);    
    }

    onAddWatchlist(e){
        e.preventDefault();

        if(this.state.selectedList != null & this.state.stockID != null){
            axios({
                method: 'post',
                url: 'http://localhost:5000/users/'+this.state.userID+'/watchlist/update/add', //dummy user
                data: {
                    name: this.state.selectedList,
                    stockID: this.state.stockID
                },
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
            })
            .then(res => {
                if(res.data.success==false){
                    console.log(res.data);
                    alert('Stock already exists on watchlist');
                }else if(res.data.success==true){
                    console.log(res.data);
                    alert('Added to watchlist');
                }
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res);
                alert('Something went wrong! Please try again later.');
            });
        }
        else{
            alert('Invalid selection');
        }
	}
	
	onChangeValueStartDay(e){
		this.setState({
            valueHistoryStartDay: e.target.value        
        });
	}

	onChangeValueEndDay(e){
		this.setState({
            valueHistoryEndDay: e.target.value        
        });
	}

	async onSubmitValueHistory(e){
		e.preventDefault();
		console.log('??');
		var valueHistory = await (requests.getValueSomeHistory(this.state.stockID, this.state.valueHistoryStartDay, this.state.valueHistoryEndDay));
		this.setState({
			stockValueHistory: valueHistory
         //   stockHistory: history
        });
	}

	onChangeStartDay(e){
		this.setState({
            tranHistoryStartDay: e.target.value        
        });
	}

	onChangeEndDay(e){
		this.setState({
            tranHistoryEndDay: e.target.value        
        });
	}

	
	async onSubmitHistory(e){
		e.preventDefault();
		console.log('??');
		var valueHistory = await (requests.getSomeHistory(this.state.stockID, this.state.tranHistoryStartDay, this.state.tranHistoryEndDay));
		this.setState({
			stockHistory: valueHistory
        });
	}

    handleChange = async (stockID) => {
        this.setState({ stockID });

        var highestBid = await (requests.getHighestBid(stockID));
        var lowestAsk = await (requests.getLowestAsk(stockID));
        
        var currentAsk = await (requests.getCurrentAsk(stockID));
        var currentBid = await (requests.getCurrentBid(stockID));
        
        var openingAsk = await (requests.getOpeningAsk(stockID));
        var openingBid = await (requests.getOpeningBid(stockID));
        
        var history = await (requests.getHistory(stockID));

		var newsstock = stockID;


		if(stockID == "MCSFT"){
			newsstock = "MSFT";
		}


		var filterNews = [];
		const promise = axios.get('https://finnhub.io/api/v1//company-news?symbol='+newsstock+'&from=2020-11-15&to=2020-12-30&token=bv269bn48v6o5ed6uu4g') //dummy user ID in place
        const news = await promise.then((response) => response.data);

		filterNews.push(news[0]);
		filterNews.push(news[1]);
		filterNews.push(news[2]);
		filterNews.push(news[3]);
		filterNews.push(news[4]);
		filterNews.push(news[5]);
		filterNews.push(news[6]);
		filterNews.push(news[7]);
		filterNews.push(news[8]);
		filterNews.push(news[9]);

		console.log(filterNews);

        var valueHistory = await (requests.getValueAllHistory(stockID));
        var stockSharesOwned = helper.getOwnedShares(this.state.stocksOwned,stockID);
        this.setState({
            ask: lowestAsk,
			bid: highestBid,
			stockValueHistory: valueHistory,
			stockHistory: history,
            stockNews: filterNews,
            owned: stockSharesOwned,
            currentAsk: currentAsk,
            currentBid: currentBid,
            openingAsk: openingAsk,
            openingBid:openingBid
        });


    }

    handleChangeWatchlist = async (selectedList) => {
        this.setState({ selectedList });
    }

    render(){
       
        return(
                <div>
                    <Navbar/>
                    <div class = "stopnav" >
					<p>Search Stocks</p>
                            <SelectSearch 
                            options={this.state.stockList} 
                            search
                            onChange = {this.handleChange}
                            name="stocks" 
                            placeholder="Search for a stock" />	
                    </div>

					<div class="ticker-wrap">
						<div class="ticker">
							{this.state.stockNews.map((item,index)=>(
									<div class="ticker__item"><a href={item.url} target="_blank">{item.source + ": " }{item.headline}</a></div>
							))}  
						</div>
					</div>
					
					
                    <div id = "main-body" class = "main">
                        <div id = "recent-asks">
                            <div id =" stock-name">
                           <h4> Stock Name: {this.state.stockID}</h4>
                            </div>

                            <h4><span id = "bid"> Highest Bid: ${this.state.bid}</span></h4>
                            <h4><span id = "ask"> Lowest Ask: ${this.state.ask}</span> </h4>
                            <h4><span id = "ask"> Current Bid: ${this.state.currentBid}</span> </h4>
                            <h4><span id = "ask"> Current Ask: ${this.state.currentAsk}</span> </h4>
                            <h4><span id = "ask"> Opening Bid: ${this.state.openingBid}</span> </h4>
                            <h4><span id = "ask"> Opening Ask: ${this.state.openingAsk}</span> </h4>
                            <h4><span> Shares Owned:{this.state.owned}</span> </h4>

                            <SelectSearch 
                                options={this.state.watchlists}
                                search
                                onChange={this.handleChangeWatchlist}
                                name="stocks" 
                                placeholder="Select a watchlist" />
                            
                            <div>
                                <button onClick = {this.onAddWatchlist}>Add to Watchlist</button>
                            </div>
                            

                        </div>

                        <div id = "stock-processed-history">
						<b> History of Processed Orders</b>
						<form onSubmit={this.onSubmitHistory}>
							<input 
								placeholder="Start Day"
								type="number"
								min = "0"
								value={this.state.tranHistoryStartDay} 
								onChange = {this.onChangeStartDay}
							/>
							<input 
								placeholder="End Day"
								type="number" 
								id = "0" 
								value={this.state.tranHistoryEndDay} 
								onChange = {this.onChangeEndDay}
							/>
							<input type="submit" value='Get History'></input>
						</form>

                        

                            <table id = "stock-history">
								<thead>
									<th>Day</th>
									<th>Sell Price</th>
									<th>Seller Ask</th>
									<th>Shares</th>
									<th>Bidder Username</th>
									<th>Seller Username</th>    
								</thead>
                                {this.state.stockHistory.map((item,index)=>(
                                    <tr>
                                        <td>{item.day}</td>
                                        <td>{item.soldFor}</td>
                                        <td>{item.asked}</td>
										<td>{item.shares}</td>
                                        <td>{item.buyerName}</td>
										<td>{item.sellerName}</td>

                                    </tr>

                                ))}                    
                            </table>
                        </div>

						
						<div id = "stock-value-history">
                        <b> Stock Price History</b>
							<div>
								<form onSubmit={this.onSubmitValueHistory}>
									<input 
										placeholder = "Start Day"
										type="number"
										min = "0"
										value={this.state.valueHistoryStartDay} 
										onChange = {this.onChangeValueStartDay}
										
									/>
									<input 
										placeholder = "End Day"	
										type="number" 
										min = "0" 
										value={this.state.valueHistoryEndDay} 
										onChange = {this.onChangeValueEndDay}
									/>
									<input type="submit" value='Get History'></input>
								</form>
								
							</div>
							
                        
							

                            <table id = "stock-history">
								<thead>
								<th>Day</th>
                                <th>Highest Ask</th>
                                <th>Lowest Ask</th>
                                <th>Highest Bid</th>
                                <th>Lowest Bid</th>
                                <th>Shares Sold</th>    
								</thead>
                                {this.state.stockValueHistory.map((item,index)=>(
                                    <tr>
                                        <td>{item.day}</td>
                                        <td>{item.highestAsk}</td>
                                        <td>{item.lowestAsk}</td>
                                        <td>{item.highestBid}</td>
                                        <td>{item.lowestBid}</td>
										<td>{item.sharesSold}</td>
                                    </tr>
                                ))}                    
                            </table>
                        </div>


                    <div id = "place-buy">
                        <form onSubmit={this.onOrderSubmit}>
                            <div className="formgroup">
                                <b>Place Buy Order</b><br/><br/>
                                    <label>Enter number of shares: </label>
                                    <input type="number" min="0" 
                                        required class="logregfield"
                                        value = {this.state.shares}
                                        onChange = {this.onChangeOrderShares}
                                        placeholder="50"
                                    />
                                    <label>Enter offer per share:  $</label>
                                    <input type="number" min="0" 
                                        required class="logregfield" 
                                        value = {this.state.price}
                                        onChange = {this.onChangeOrderOffer}
                                        placeholder="100"/>  
                            </div>

                            <div>
                                <input type="submit" value='Place Buy Order'></input>
                            </div>
                        </form>
                    
                    </div>


                    <div id = "create-event">
                        <form onSubmit={this.onEsSubmit}>
                            <div className="formgroup">
                                <b>Create an Event Subscription</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params" value={this.state.parameter} onChange = {this.onChangeEsParameter}>
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select>

								<select name="select" id = "select-params" value={this.state.type} onChange = {this.onChangeEsType}>
                                    <option value="Bid">Bid</option>
                                    <option value="Ask">Ask</option>
                                </select> <br/>

                                <label>Enter amount</label>
                                <input type="number" min="0" 
                                    required class="logregfield"
                                    value={this.state.parameter} 
                                    onChange = {this.onChangeEsAmount}
                                    placeholder="%10"/>
                            </div>
                            <div>
                            <input type="submit" value='Place Event Subscription'></input>
                            </div>
                        </form>
                    
                    </div>

                    </div>

                </div>
        )
    }

}
