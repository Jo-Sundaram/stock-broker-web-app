// Importing combination 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';	

  
const requests = {


    generateSellID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.sellOrders)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise2 = await promise2.then((response) => response.data.unpSellOrders)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }


        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.orderID == result);
            const found2 = dataPromise2.some(el => el.orderID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        
        
        return result;
    },

    generateBuyID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.buyOrders)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
		
		console.log(dataPromise);
        const dataPromise2 = await promise2.then((response) => response.data.unpBuyOrders)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.orderID == result);
            const found2 = dataPromise2.some(el => el.orderID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        return result;
    },

    generateESID: async function(stockID, userID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.eventSubscriptions)

        const promise2 = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise2 = await promise2.then((response) => response.data.eventSubscriptions)
        
        var valid = 1;
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;

        for ( var i = 0; i < 12; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        console.log(dataPromise2);
        while(valid){
            const found = dataPromise.some(el => el.subscriptionID == result);
            const found2 = dataPromise2.some(el => el.subscriptionID == result);
            if(!found && !found2){
                valid = 0;
            }
            else{
                result ='';
                for ( var i = 0; i < 12; i++ ) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
            }
        }
        
        return result;
    },

    getLowestAsk: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.buyOrders)

        console.log(dataPromise);


        var lowestAsk = 'N/A';
        for (var key in dataPromise){
            if(dataPromise[key].price < lowestAsk || lowestAsk == 'N/A')
            {
                lowestAsk = dataPromise[key].price;
            }
            
        }

        return lowestAsk;
    },

    getHighestBid: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.sellOrders)

        console.log(dataPromise);

        var highestBid = 'N/A';
        for (var key in dataPromise){
			console.log(dataPromise[key].price);
            if(dataPromise[key].price > highestBid || highestBid == 'N/A')
            {
                highestBid = dataPromise[key].price;
            }
        }

        return highestBid;
    },

    getCurrentAsk: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.currentAsk)

        console.log(dataPromise);

        var currAsk = 'N/A';
        currAsk = dataPromise;

        return currAsk;

    },
    
    getCurrentBid: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.currentBid)

        console.log(dataPromise);

        var currBid = 'N/A';
        currBid = dataPromise;

        return currBid;

    },

    getOpeningAsk: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.openingAsk)

        console.log(dataPromise);

        var openAsk = 'N/A';
        openAsk = dataPromise;

        return openAsk;
    },

    getOpeningBid: async function(stockID){
        const promise = axios.get('http://localhost:5000/stocks/'+stockID+ '/info') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.openingBid)

        console.log(dataPromise);

        var openBid = 'N/A';
        openBid = dataPromise;

        return openBid;
    },

    parseListItems: async function(userID){
        const promise = axios.get('http://localhost:5000/users/'+userID) //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data.watchlistCollection)

        var parsedList = [];

        console.log(dataPromise);

        for(var key in dataPromise){
            parsedList.push({'name': dataPromise[key].name, 'value': dataPromise[key].name});
        }

		return parsedList;
		console.log('');
    },


    parseStockItems: async function(){
        var list = []

        const promise = axios.get('http://localhost:5000/stocks/') //dummy user ID in place
        
        const dataPromise = await promise.then((response) => response.data);

        console.log(dataPromise)

        for(var key in dataPromise){
            list.push({'name':[dataPromise[key].stockFullName," (" + dataPromise[key].symbol + ")"], 'value': dataPromise[key].symbol})

        }

        console.log("newList");
        console.log(list);


        return list;
    },


    getHistory: async function(stockID){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID+'/history') //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},

	getName: async function(stockID){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID+'/info') //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data.stockFullName);

        return dataPromise;
	},

	getSomeHistory: async function(stockID, startday, endday){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID+'/history' + '?startday=' + startday + '&endday=' + endday) //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},
	
	getValueAllHistory: async function(stockID){

        const promise = axios.get('http://localhost:5000/stocks/'+stockID + '?startday=' + 0); //dummy user ID in place
        const dataPromise = await promise.then((response) => response.data);

        return dataPromise;
	},
	
	getValueSomeHistory: async function(stockID, startday, endday){

		const promise = axios.get('http://localhost:5000/stocks/'+stockID + '?startday=' + startday + '&endday=' + endday); //dummy user ID in place
		const dataPromise = await promise.then((response) => response.data);

		return dataPromise;
		
	}
}
  
// Exporting the component 
export default requests; 