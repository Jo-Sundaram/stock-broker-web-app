
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

  
const helper = {
    parseListItems: async function(userID){
        const promise = axios.get('http://localhost:5000/users/'+userID ) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.watchlistCollection)

        var parsedList = [];

        for(var key in dataPromise){
            parsedList.push({'name': dataPromise[key].name, 'value': dataPromise[key].name});
        }

        return parsedList;
    },

    getStockItems: async function(userID, listname){
		const promise = axios({
			method: 'get',
			url: 'http://localhost:5000/users/'+userID + '/watchlist/' + listname, //dummy user
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		})
		
		
        const dataPromise = await promise.then((response) => response.data)

        console.log(dataPromise);

        var stocks = []

        for(var key in dataPromise.watchlist){
            stocks.push({'stockID': dataPromise.watchlist[key].stockID,'name':dataPromise.watchlist[key].stockName, 
                        'shares':dataPromise.watchlist[key].sharesOwned, 'avgBid':dataPromise.watchlist[key].avgBid,
                        'currVal':dataPromise.watchlist[key].currAsk});
        }
        return stocks;
    },
    
    getOwnedShares: function(stockPortfolio,symbol){
        for(var key in stockPortfolio){
            if(stockPortfolio[key].stockID == symbol){
                return stockPortfolio[key].shares;
            }
        }
        return 0;
    }
}



// const helper = {


// parseListItems : (list)=>{
//     var parsedList = [];

//     console.log('parse')
//     // console.log(list)
    
//     list.forEach(item =>{

//         // console.log(item)
//         // console.log(item.name)
//         parsedList.push(item);

//         // item.watchlist.forEach(subitem =>{
//         //     parsedList.push(subitem);
//         //     console.log("SUBITEM")
//         //     console.log(subitem);
//         // });

//     });

//     // parsedList.forEach(item =>{

//     //     item.watchlist.forEach(subItem=>{
//     //       console.log(subItem.stockID);

//     //     })
      
//     // });

//     return parsedList;

//     },







export default helper;