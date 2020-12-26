import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavBar.css'


export default class Navbar extends Component {
      constructor(props){
        super(props)

        this.onRefresh = this.onRefresh.bind(this);


      }

      onRefresh(e){
        e.preventDefault()
        window.location.reload(false)
      }
  

  render() {
    return (
      <nav class="navbar">
        <ul class="navbar-nav">
          <li class="logo">
            <a href="#" class="nav-link">
              <span class="logo-text">Best Trade</span>
              <i class="fas fa-angle-double-right"></i>
            </a>
          </li>
    
          <li class="nav-item">

            {/* <Link to = "/search"> */}
            <a  class="nav-link" href = '/search'>
              <span class="link-text">Search <br/> Stocks</span>
              <i class="fas fa-search"></i>
            </a>
            {/* </Link> */}
          </li>
          <li class="nav-item">
              {/* <Link to = '/home' onclick={() => this.onRefresh()}> */}
                <a class="nav-link" href='/home'>
                <span class="link-text">Your <br/> Stocks</span>
                <i class="fas fa-chart-line"></i>
                </a>
             {/*  </Link> */}
          </li>
          
          <li class="nav-item">
              {/* <Link to = '/home' onclick={() => this.onRefresh()}> */}
                <a class="nav-link" href='/notifications'>
                <span class="link-text">Notifications</span>
                <i class="fas fa-chart-line"></i>
                </a>
             {/*  </Link> */}
          </li>

          <li class="nav-item">
            {/* <Link to = "/watchlist"> */}
              <a class="nav-link" href = '/watchlist'>
                <span class="link-text">Edit <br/> Watchlist</span>
                <i class="fas fa-eye"></i>
              </a>
            {/* </Link> */}

          </li>
    
          <li class="nav-item">
            {/* <Link to = "/eventsubs"> */}
              <a class="nav-link" href = '/eventsubs'>
                <span class="link-text">Edit <br/> Subscriptions</span>
                <i class="fas fa-bell"></i>
              </a>
            {/* </Link> */}
          </li>
    
        
    
          <li class="nav-item">
            {/* <Link to ="/account"> */}
             <a class="nav-link" href = "/account">
                
                <span class="link-text">Account</span>
                <i class="fas fa-user"></i>
              </a>
              
            {/* </Link> */}
           
          </li>

        </ul>
      </nav>
    );
  }
}