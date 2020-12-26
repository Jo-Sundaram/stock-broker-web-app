import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./account.css"
import Navbar from "../NavBar/navbar.component";

export default class Account extends Component{
    

    constructor(props){
        super(props);
        this.onLogout = this.onLogout.bind(this);

        this.state = {
            userID: " ",
            username: '',
            password: '',
            email: '',
        }
    }

   componentDidMount() {
        console.log('reloaded /account');

        // this.componentWillReceiveProps(this.props)

    } 


    componentWillReceiveProps(props){
        console.log("here")
        this.setState({
            userID: props.user._id,
            username: props.user.username,
            password: props.user.password,
            email: props.user.email
        })

    }



    onLogout(e){
        e.preventDefault()
        localStorage.removeItem('token');
        console.log("button")
        alert('You have been successfully logged out!')
        

        window.location = '/login';
    }

    render(){
        return(
            <div>
                <Navbar/>

                <div className = "userInfo">
                    <h1>Your Account <button onClick = {this.onLogout}>Logout</button></h1>

                    <h3>Userame: {this.state.username}</h3>
                    <h3>Email: {this.state.email}</h3>

                </div>

                <div className = "change-credentials">
                    <h3 >Change Password</h3>
                    <div className="change-pass-email">
                        <label ><b>Email</b></label><br></br>
                        <input type="text" class="logregfield" placeholder="Enter Email"></input>
                    </div>

                    <div className="change-pass-email">
                        <label ><b>New Password</b></label><br></br>
                        <input class="logregfield" placeholder="Enter Password"></input>
                    </div>
                    <div className="change-pass-email">
                        <label ><b>Confirm Password</b></label><br></br>
                        <input class="logregfield" placeholder="Enter Password"></input>
                    </div>
                </div>

            </div>

        );
    }
}