import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./watchlist.css"
import helper from "./helper.js"



export default class Watchlist extends Component{
    constructor(props){
        super(props);
        // this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);

    
        this.state = {
            userID: "5f890ebbbb89e66e947f5652",
            watchlistCollection: [],
            parsedLists: [],
        }
    }
    componentDidMount() {
        console.log('reloaded');
        axios.get('http://localhost:5000/users/' + this.state.userID + '/watchlist') //dummy user ID in place
            .then(response => {
                let list = helper.parseList(response.data);

                this.setState({
                    watchlistCollection: response.data,
                    parsedLists:list
                })
                // console.log(response.data)

              
                
            })
            .catch(function (error) {
                console.log(error);
            })
    }


// change to onRemove
    onRemove(e){
        e.preventDefault();   

        var newArray = this.state.watchlist;
        // console.log(newArray);
    
        newArray.push({
            stockID: this.state.stockID,
        });

        // console.log(newArray);
        axios({
            method: 'post',
            url: 'http://localhost:5000/users/update/5f890ebbbb89e66e947f5652', //dummy user
            data: {
                watchlist: newArray,
            }
        })
        .then(res => {
            console.log(res.data)
            //i want a function for this.
            alert('Watchlist Item Added Successfully!')

            //window.location.reload(false);
        })
        .catch(res => {
            console.log(res)
            alert('Something went wrong! Please try again later.')
        });
    }





    render(){
        console.log("watchlist");
        this.state.parsedLists.map(item=>{
            console.log(item.stockID);

        });

        return(

            <div className>
                <div className = "watchlist">
                    <h2></h2>                    
                    <table>
                        <th>Remove</th>
                        <th>Symbol</th>
                        <th>Name</th>
                        <th>Shares Owned</th>
                        <th>AVG price paid</th>
                        <th>Current value</th>
                        {this.state.parsedLists.map((item,index)=>(
                            <tr>
                                <td><input type="checkbox" name="Remove" value={[item.stockID]} onChange = {this.onSelectCancel}/></td>
                                <td>{item.stockID}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.shares}</td>
                                <td>False</td>
                            </tr>
                        ))}
                    </table>

                </div>


            </div>


        );


    }

}