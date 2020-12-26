import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Navbar from "../NavBar/navbar.component";
import "./notifications.css"
import helper from "../functions/helper.js"
import SelectSearch from 'react-select-search';


export default class Notification extends Component{
    constructor(props){
		super(props);
        this.state = {
            userID: "",
            notifications: []
        }
    }

    
   componentDidMount() {
    console.log('reloaded /notifications');
    } 

    async componentWillReceiveProps(props){
        let array = props.user.notifications;
        
        this.setState({
         	userID: props.user._id,
          	notifications: array.reverse()

        })

        var parsedList = []
        try {
            parsedList = await (helper.parseListItems(props.user._id));            
        }
          catch(e) {
            console.log('Catch an error: ', e)
        }
        
        this.setState({parsedLists:parsedList});
        console.log(parsedList);   
    }


    render(){
         return(

            <div>
                <Navbar/>
                <h2>Your Notifications</h2>
            
                <div className = "notifications">
                    <h2></h2>                    
                    <table>
                        <th>Message</th>
                        {this.state.notifications.map((item,index)=>(
                            <tr>
                                {/* <td><input type="radio" name="Remove" value={[item.stockID]} onChange = {this.onSelectStock}/></td> */}
                                <td>{item.notification}</td>
                            </tr>
                        ))}
                    </table>
                {/* <button onClick ={this.onRemoveStock}>Remove Stock</button>            
                <button onClick = {this.onRemoveList}>Delete Entire List</button>             */}
                </div>
            </div>
        );
    }
}