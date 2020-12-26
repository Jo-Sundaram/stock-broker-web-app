const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3 },
    email: {type: String, required: true, unique: true, trim: true }, //there is most likely a JS library that can verify an email being legitimate or not
    password: {type: String, required: true },
    userFunds: {type: Number, required: true },
     //we need to design a function that allows user/remove funds from their account
    
    stockPortfolio: [ {
        stockID: { type: String, required: true },
        shares: {type: Number, required: true}
    }],
     watchlistCollection: [{
         name: {type: String, required: true},
         watchlist:[{
            stockID: { type: String, required: true },
            stockName: { type: String, required: true },
            sharesOwned: { type: String, required: true },
            avgBid: { type: Number, required: true },
            currAsk: { type: Number, required: true },
         }]
    }],

    notifications: [{
        notification: { type: String, required: true } //////we have to figure out the structure for a notification object
    }],

    eventSubscriptions: [{ //so users can edit their own subscriptions/view their own subscriptions
        subscriptionID: {type: String, required: true},
        stockID: { type: String, required: true },
		parameter: {type: String, required: true },
		type: {type: String, required: true},
        value: {type: Number, required: true}, //we have to figure out the structure for eventSubscription parameters
        triggerOrder: {type: Boolean, required: true} //automated trading thing, unstructured
    }], 

    unpBuyOrders: [{  //so users can view/edit(?) their own buy/sell orders
        orderID: {type: String, required: true},
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users bid
    }], 

    unpSellOrders: [{
        orderID: {type: String, required: true},
        stockID: {type: String, required: true},
        shares: {type: Number, required: true},
        price: {type: Number, required: true} //users price to sell
    }],

    pBuyOrders: [{
		day: {type: Number, required: true},  
        buyerID: {type: String, required: true},
		sellerID: { type: String, required: true },
		buyerName: {type: String, required: true},
		sellerName: {type: String, required: true},
        shares: {type: Number, required: true},
        soldFor: {type: Number, required: true},
        asked: {type: Number, required: true},
        datetime: {type: String, required: true} //users bid
    }], 

    pSellOrders: [{
		day: {type: Number, required: true},
        buyerID: {type: String, required: true},
		sellerID: { type: String, required: true },
		buyerName: {type: String, required: true},
		sellerName: {type: String, required: true},
        shares: {type: Number, required: true},
        soldFor: {type: Number, required: true},
        asked: {type: Number, required: true},
        datetime: {type: String, required: true} //users price to sell
	}],
	
	fundsHistory: [{
		amount:{type: Number, required: true},
		type:{type: String, required: true}
	}]
    
},{
    timestamps: true, //idk what this does ngl>???
});

const User = mongoose.model('User', userSchema);

User.init().then(() => {
});

module.exports = User;