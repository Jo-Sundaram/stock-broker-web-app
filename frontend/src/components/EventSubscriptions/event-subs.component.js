import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./event-subs.css"
import Navbar from "../NavBar/navbar.component";

export default class EventSubs extends Component{

    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onSelectEdit = this.onSelectEdit.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onChangeEsAmount = this.onChangeEsAmount.bind(this);

		this.onChangeEsNotification = this.onChangeEsNotification.bind(this);
		this.onChangeEsParameter = this.onChangeEsParameter.bind(this);
    
        this.state = {
            userID: "",
            eventSubscriptions: [],
            stockID: 'TSLA',
			esParameter: "incPrcnt",
			esType: "",
            esAmount: "15",

            editAmount :null,
            editStockID :null,
            editSubID :null,

            submitButton : 0,

			notification: true
        }
    }

    
    componentDidMount() {
        console.log('reloaded /eventsubs');
    
    } 
    
    componentWillReceiveProps(props){

        this.setState({
            userID: props.user._id,
            eventSubscriptions: props.user.eventSubscriptions

        })
        console.log(this.props)
		console.log(props.user.eventSubscriptions);
    }


    onSelectEdit(e){
        this.setState({
            editStockID: e.target.value.split(",")[1],
            editSubID: e.target.value.split(",")[2]
        });
        console.log('selected');
        
    }

    onChangeEsAmount(e){
        this.setState({
            editAmount: e.target.value        
        });
	}
	
	onChangeEsParameter(e){
        this.setState({
            esParameter: e.target.value        
        });
	}
	
	onChangeEsNotification(e){
        this.setState({
            notification: e.target.value        
        });
    }



    onSubmit(e){

        if(this.state.submitButton==1){
            return this.onEdit;
        }
        console.log("remove");
        return this.onRemove;
    }

    async onEdit(e){
        e.preventDefault();
        console.log(this.state.editSubID);
        console.log(this.state.editAmount);

        if(this.state.esParameter !=null && this.state.editAmount != null && this.state.editAmount != 0){
            
            // var ID = await (requests.generateESID(this.state.stockID, this.state.userID));

            axios.all([
                axios({
                    method: 'post',
                    url: 'http://localhost:5000/update/'+this.state.userID+ '/'+this.state.editStockID+'/ES/update/'+this.state.editSubID, //dummy user
                    data: {
                        parameter: this.state.esParameter,
                        value: this.state.editAmount,
                        triggerOrder: this.state.notification
                    },
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                }),
        
            ])
            .then(res => {
                console.log(res.data)
                alert("Successfully Edited ES")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("ES edit failed. Please try again.");
            })
        }else{
            alert("Please fill out fields to edit");
        }
    }

    onRemove(e){
        e.preventDefault();
        console.log("removed");
        if(this.state.editStockID != null && this.state.editSubID!=null){
            axios.all([
                axios({
                    method: 'delete',
                    url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.editStockID+ '/ES/remove/' +this.state.editSubID, //dummy user,
					headers: {
						Authorization: "Bearer " + localStorage.getItem("token")
					}
                
                })
            ])
            .then(res => {
                console.log(res.data)
                alert("Successfully cancelled event subscription.")
                window.location.reload(false);
            })
            .catch(res => {
                console.log(res)
                alert("Cancellation failed. Please try again later.");
            })
        }else{
            alert("Please select a stock to remove");
        }

    }

    render(){
        return(

            <div>
                <Navbar/>
				<div class="topnav">
					<p>Your Event Subscriptions</p>
				</div>
				<br>
				</br>
                    <div class = "eventsubscriptions">
                        <table>
							<thead>
								<th>Select</th>
								<th>Symbol</th>
								<th>Parameter</th>
								<th>Value</th>
								<th>Trigger</th>
							</thead>
                            {this.state.eventSubscriptions.map((item =>
                                <tr>
                                    <td><input type="radio" name="select" value={[item.value, item.stockID, item.subscriptionID]} onChange = {this.onSelectEdit}/></td>
                                    <td>{item.stockID}</td>
                                    <td>{item.parameter}</td>
									<td>{item.value}</td>
									{item.triggerOrder == false &&
										<td>Off</td>
									}
									{item.triggerOrder == true &&
										<td>On</td>
									}
									
                                </tr>
                                ))}
                        </table>
                        <form>
                            
                                <b>Edit Subscription: {this.state.editStockID}</b><br/>
                                <label>Select Parameter</label>
                                <select name="select" id = "select-params" value={this.state.parameter} onChange = {this.onChangeEsParameter}>
                                    <option value="incPrcnt">+ %</option>
                                    <option value="decPrcnt">- %</option>
                                    <option value="incDollar">+ $</option>
                                    <option value="decDollar">- $</option>
                                </select> 

                                <label>Enter amount</label>
                                <input type="number" min="0" 
                                    required class="logregfield"
                                    value={this.state.parameter} 
                                    onChange = {this.onChangeEsAmount}
                                    placeholder="%10"/>
                            
                                <div>

								<label>Turn On Notification</label>
                                <select name="select" id = "select-params" value={this.state.notification} onChange = {this.onChangeEsNotification}>
                                    <option value="true">On</option>
                                    <option value="false">Off</option>
                                </select> 
                                <button onClick = {this.onEdit}>Edit Subscription</button>
                                <button onClick = {this.onRemove}>Remove Subscription</button>
                                </div>
                            </form>
                    </div>    

               
                  
                </div>
                
        );
    }
}