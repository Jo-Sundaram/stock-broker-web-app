const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    stockFullName: {type: String, required: true, unique: true },
    symbol: {type: String, required: true },
    openingAsk: {type: Number, required: true},
    openingBid: {type: Number, required: true},
    currentAsk: {type: Number, required: true},
	currentBid: {type: Number, required: true},
	currHighestAsk: {type: Number, required: true},
	currLowestBid: {type: Number, required: true},
    eventSubscriptions: [{
        subscriptionID: {type: String, required: true},
        userID: { type: String, required: true },
        type: {type: String, required: true}, //buy or sell event subscription
        parameter: {type: String, required: true }, //we have to figure out the structure for eventSubscription parameters
        value: {type: Number, required: true},
        triggerOrder: {type: Boolean, required: true}, //automated trading thing, unstructured
        notifSent: {type: Number, required: true}
    }], 
    sellOrders: [{
        orderID: {type: String, required: true},
        orderPlacement: {type: Number, required: true},
        userID: { type: String, required: true },
        username: { type: String, required: true },
        shares: {type: Number, required: true},
        price: {type: Number, required: true},
    }],
    buyOrders: [{
        orderID: {type: String, required: true},
        orderPlacement: {type: Number, required: true},
        userID: { type: String, required: true },
        username: { type: String, required: true },
        shares: {type: Number, required: true},
        price: {type: Number, required: true}
    }],
    history: [{
		day: {type: Number, required: true},
        buyerID: {type: String, required: true},
		sellerID: { type: String, required: true },
		buyerName: {type: String, required: true},
		sellerName: {type: String, required: true},
        shares: {type: Number, required: true},
        soldFor: {type: Number, required: true},
        asked: {type: Number, required: true},
        day: {type: Number, required: true}
	}],
	dailyHistory: [{
		day: {type: Number, required: true},
		lowestAsk: {type: Number, required: true}, //(same thing as closing/current)
		highestBid: {type: Number, required: true}, //(same thing as closing/current)
		highestAsk: {type: Number, required: true},
		lowestBid: {type: Number, required: true},
		sharesSold: {type: Number, required: true}
	}],
    fulfilledOrders: [{
        buyerID: {type: String, required: true},
        sellerID: {type: String, required: true},
        shares: {type: Number, required: true},
        soldFor: {type: Number, reqiured: true}
    }],
    unfulfilledOrders: [{
        type: {type: String, required: true},
        userID: { type: String, required: true },
        shares: {type: Number, required: true},
        price: {type: Number, required: true},
    }]
}, {
    timestamps: true, //idk what this does ngl>???
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;