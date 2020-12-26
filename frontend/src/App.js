import React, {useState, useEffect, Component} from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import socketIOClient from "socket.io-client";
import './App.css';

import Register from "./components/Login/register-user.component";
import LoginUser from "./components/Login/login-user.component";
import Home from "./components/Dashboard/home-page.component";
import Search from "./components/Search/search-page.component"
import Account from "./components/Account/account.component"
import Watchlist from "./components/Watchlist/watchlist-page.component"
import EventSubscriptions from "./components/EventSubscriptions/event-subs.component"
import Secret from "./Secret";
import Notification from "./components/Notifications/notification.component"
import { UserContext } from './UserContext';


const ENDPOINT = "http://127.0.0.1:5000";
// export const thisUser = "";

function App() {

  let history = useHistory();
  const [response, setResponse] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);

      fetch("http://localhost:5000/api/secret", {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
      },})
        .then((res) => {
            return res.json();
        })
        .then((user) => {
            console.log("User connected" + user);
            setUser(user);
			socket.emit("connected", user._id);
        })
        .catch((err) => {
            console.log(err);
		});
		
		socket.on("processedBuyOrder", (purchase, symbol, user) => {
			alert("You bought " + purchase.shares + ' shares of ' + symbol + " for $" + purchase.soldFor + " from " + user);
		});

		socket.on("processedSellOrder", (purchase, symbol, user) => {
			console.log("?");
			alert("You sold " + purchase.shares + ' shares of ' + symbol + " for $" + purchase.soldFor + " to " + user);
		});

		socket.on("unprocessedOrder", (order, symbol) => {
			alert("Could not fulfill " + order.type + " order" + " for " + symbol + " (" + order.price +"/share, " + order.shares + "shares)");
		});

		socket.on("eventNotif", (notification) => {
			alert("EVENT SUBSCRIPTION: " + notification.stock + " " + notification.type + " " + notification.change + " by " + notification.value + notification.param + ".");
		});
		
		socket.on("hellow", () => {
			console.log("hi!");
			socket.emit("wtf");
		});

  },[]);
console.log("CURRENT USER " + user.email)
console.log("CURRENT USER " + user.stockPortfolio)

if(user.stockPortfolio!==undefined){
   console.log(Object.keys(user.stockPortfolio))
	//console.log("Stock portfolio: " + Object.keys( user.stockPortfolio["0"]))
}
//



   return (
    
    // <Router>
      <div className="container">

        <Router>
          <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={LoginUser} />
    

          <Route path = "/home" render = {(routeProps) => (<Home {...routeProps} user = {user}/>)}/>
           
          <Route path="/search" render = {(routeProps) => (<Search {...routeProps} user = {user}/>)}/>

          <Route path="/account" render = {(routeProps) => (<Account {...routeProps} user = {user}/>)}/>

          <Route path="/watchlist" render = {(routeProps) => (<Watchlist {...routeProps} user = {user}/>)}/>

          <Route path="/eventsubs" render = {(routeProps) => (<EventSubscriptions {...routeProps} user = {user}/>)}/>

		  <Route path="/notifications" render = {(routeProps) => (<Notification {...routeProps} user = {user}/>)}/>

          <Route path="/secret" component={Secret} />
        </Switch>
      </Router>
      </div>
  );
}
 



export default App;