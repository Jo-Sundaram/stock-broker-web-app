// Importing combination 
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

  
const requests = {
    // getStockSellOrders: async function(stockID){
    //     const promise = axios.get('http://localhost:5000/stocks/'+stockID) //dummy user ID in place
        
    //     const dataPromise = await promise.then((response) => response.data.sellOrders)
        
    //     return dataPromise
    // },

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
    }
}
  
// Exporting the component 
export default requests; 