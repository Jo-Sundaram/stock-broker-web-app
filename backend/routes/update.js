const express = require("express");
let User = require('../models/user.model');
let Stock = require('../models/stock.model');
const app = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken")

let buyOrderPlacement = 0;
let sellOrderPlacement = 0;

//Event Subscriptions

app.post("/:id/:symbol/ES/add", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.findByIdAndUpdate(req.params.id,{
			$push: {eventSubscriptions: {
				subscriptionID: req.body.subscriptionID,
				stockID: req.params.symbol,
				parameter: req.body.parameter,
				value: req.body.value,
				type: req.body.type,
				triggerOrder: req.body.triggerOrder
			}}}, 
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);

		Stock.findOneAndUpdate({'symbol' : req.params.symbol},{
			$push: {eventSubscriptions: {
				subscriptionID: req.body.subscriptionID,
				userID: req.params.id,
				value: req.body.value,
				parameter: req.body.parameter,
				triggerOrder: req.body.triggerOrder
			}}}, 
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);
		res.json({success: true});
	}
});

// Edit ES
app.post("/:id/:symbol/ES/update/:eid",  passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.updateMany(
			{_id: req.params.id, 'eventSubscriptions.subscriptionID' : req.params.eid},
			{$set: 
				{'eventSubscriptions.$.value': req.body.value,
				'eventSubscriptions.$.parameter': req.body.parameter,
				'eventSubscriptions.$.triggerOrder': req.body.triggerOrder
				}
			},
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);
		Stock.updateMany(
			{"symbol": req.params.symbol, 'eventSubscriptions.subscriptionID' : req.params.eid},
			{$set: 
				{'eventSubscriptions.$.value': req.body.value,
				'eventSubscriptions.$.parameter': req.body.parameter,
				'eventSubscriptions.$.triggerOrder': req.body.triggerOrder
				}
			},
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);
		res.json({success: true});
	}
});

// Remove ES
app.delete("/:id/:symbol/ES/remove/:eid", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.findByIdAndUpdate(
			{_id: req.params.id},
			{$pull: {'eventSubscriptions': {subscriptionID: req.params.eid}}},
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);
		
		Stock.findOneAndUpdate(
			{"symbol": req.params.symbol},
			{$pull: {'eventSubscriptions': {subscriptionID: req.params.eid}}},
			function(err){
				if(err){
					return res.status(422).send(err);
				}
			}
		);
		res.json({success: true});
	}
});

//Buy Orders

app.post("/:id/:symbol/buyorder/add", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		let funds;
		var orderTotal = req.body.price*req.body.shares;
		const user = await User.findById(
			req.params.id,
			function(err,result){
				if(err){
					return res.status(400).send(err);
				}
				funds = result.userFunds;
			}
		);

		let currStock = await Stock.findOne({'symbol' : req.params.symbol});
		
		if(funds>=orderTotal){

			var highestBid = req.body.price;
			for (var key in currStock.buyOrders){
				if(currStock.buyOrders[key].price > highestBid || highestBid == 0)
				{
					highestBid = currStock.buyOrders[key].price;
				}
				
			}
			buyOrderPlacement += 1
			User.findByIdAndUpdate(
				req.params.id,
				{$push: {unpBuyOrders : {
					orderID: req.body.orderID,
					stockID: req.params.symbol,
					shares: req.body.shares,
					price: req.body.price
				}},
				$set:{userFunds: funds-orderTotal}},
				function(err){
					if(err){
						return res.status(400).send(err);
					}
				}
			);
			Stock.updateMany(
				{'symbol' : req.params.symbol},
				{$push: {buyOrders: {
					orderID: req.body.orderID,
					orderPlacement: buyOrderPlacement,
					userID: req.params.id,
					shares: req.body.shares,
					price: req.body.price
				}},
				$set:{currentBid: highestBid}
			},
				function(err){
					if(err){
						return res.status(400).send(err);
					}
				}
			);
			res.json({success: true});
		}
		else{
			return res.status(422).send({ success: false, message: 'Insufficient User Funds' });
		}
	}
});

app.delete("/:id/:symbol/buyorder/remove/:bid", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		let funds;
		let orderTotal;
		const user = await User.findById(
			req.params.id,
			async function(err,result){
				if(err){
					return res.status(400).send(err);
				}
				funds = result.userFunds;
				for(var i in result.unpBuyOrders){
					if(result.unpBuyOrders[i].orderID = req.params.bid){
						orderTotal = result.unpBuyOrders[i].shares*result.unpBuyOrders[i].price
					}
				}
				// }        if(this.state.cancelOrderID != null && this.state.cancelStockID !=null){
				// 	axios.all([
				// 		axios({
				// 			method: 'delete',
				// 			url: 'http://localhost:5000/update/'+this.state.userID+'/'+this.state.cancelStockID+'/'+this.state.cancelType+'/remove/' +this.state.cancelOrderID, //dummy user
				// 			data: {
				// 				orderID: this.state.cancelOrderID
				// 			}
				// 		})
				// 	])
				// 	.then(res => {
				// 		console.log(res.data)
				// 		alert("Successfully cancelled buy order.")
				// 		window.location.reload(false);
				// 	})
				// 	.catch(res => {
				// 		console.log(res)
				// 		alert("Cancellation failed. Please try again later.");
				// 	})
				// }
			}
		);

		User.findByIdAndUpdate(
			req.params.id,
			{$pull: {unpBuyOrders: {
				orderID: req.params.bid
			}},
			$set:{userFunds: funds+orderTotal}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
			}
		);

		Stock.findOneAndUpdate(
			{'symbol' : req.params.symbol},{
			$pull: {buyOrders: {
				orderID: req.params.bid
			}}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
			}
		);
		res.json({success: true});
	}
});

//Sell Orders

app.post("/:id/:symbol/sellorder/add", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		let shares;
		const user = await User.findById(
			req.params.id,
			function(err,result){
				if(err){
					return res.status(400).send(err);
				}
				for (var i in result.stockPortfolio){
					if(result.stockPortfolio[i].stockID == req.params.symbol){
						shares = result.stockPortfolio[i].shares;
					}
				}
			}
		);

		let currStock = await Stock.findOne({'symbol' : req.params.symbol});

		

		if(shares>=req.body.shares){

			var lowestAsk = req.body.price;
			for (var key in currStock.sellOrders){
				if(currStock.sellOrders[key].price < lowestAsk || lowestAsk == "N/A")
				{
					lowestAsk = currStock.sellOrders[key].price;
				}
			}

			sellOrderPlacement += 1;
			User.updateMany(
				{_id: req.params.id, 'stockPortfolio.stockID': req.params.symbol},
				{$push: {unpSellOrders : {
					orderID: req.body.orderID,
					stockID: req.params.symbol,
					shares: req.body.shares,
					price: req.body.price
				}},
				$set:{'stockPortfolio.$.shares': shares-req.body.shares}},
				function(err){
					if(err){
						return res.status(400).send(err);
					}
				}
			);
			Stock.updateMany(
				{'symbol' : req.params.symbol},
				{$push: {sellOrders: {
					orderID: req.body.orderID,
					orderPlacement: sellOrderPlacement,
					userID: req.params.id,
					shares: req.body.shares,
					price: req.body.price
				}},
				$set:{currentAsk: lowestAsk}
				},
				function(err){
					if(err){
						console.log(err);
					}
				}
			);
			res.json({success: true});
		}
		else{
			return res.status(422).send({ success: false, message: 'User does not own enough stocks.' });
		}
	}
});

app.delete("/:id/:symbol/sellorder/remove/:sid", passport.authenticate("jwt", { session: false }), async function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		let shares;
		let sellShares;
		const user = await User.findById(
			req.params.id,
			function(err,result){
				if(err){
					return res.status(400).send(err);
				}
				for (var i in result.stockPortfolio){
					if(result.stockPortfolio[i].stockID == req.params.symbol){
						shares = result.stockPortfolio[i].shares;
					}
				}
				for (var i in result.unpSellOrders){
					if(result.unpSellOrders[i].orderID == req.params.sid){
						sellShares = result.unpSellOrders[i].shares;
					}
				}
			}
		);

		User.updateMany(
			{_id: req.params.id, 'stockPortfolio.stockID': req.params.symbol},
			{$pull: {unpSellOrders: {
				orderID: req.params.sid
			}},
			$set:{'stockPortfolio.$.shares': shares+sellShares}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
			}
		);

		Stock.findOneAndUpdate(
			{'symbol' : req.params.symbol},{
			$pull: {sellOrders: {
				orderID: req.params.sid
			}}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
			}
		);
		res.json({success: true});
	}
});

app.get("/:symbol/", async function(req, res){ //i wanna change :day to a query parameter
    
    let day = parseInt(req.query['day']);

    let sellOrders = [];
    let buyOrders = [];

    let completedOrders = [];
    let uncompletedOrders = [];

    const stock = await Stock.findOne(
        {'symbol' : req.params.symbol},
        function(err, result){
            if(err){
				console.log(err);
            }
            sellOrders = result.sellOrders;
            buyOrders = result.buyOrders;
        }
	);
	
	var highestAsk = 'N/A';
	for (var key in sellOrders){
		if(sellOrders[key].price > highestAsk || highestAsk == 'N/A')
		{
			highestAsk = sellOrders[key].price;
		}
	}
	if(highestAsk == 'N/A'){
		highestAsk = 0;
	}

	var lowestBid = 'N/A';
	for (var key in buyOrders){
		if(buyOrders[key].price < lowestBid || lowestBid == 'N/A')
		{
			lowestBid = buyOrders[key].price;
		}
		
	}
	if(lowestBid == 'N/A'){
		lowestBid = 0;
	}
    
    let isSwapped = true;
    while(isSwapped)
    {
        isSwapped = false;
        for (let i = 0; i < sellOrders.length - 1; i++)
        {
            if (sellOrders[i].price > sellOrders[i+1].price)
            {
                isSwapped = true;

                let tmp = sellOrders[i+1];
                sellOrders[i + 1] = sellOrders[i];
                sellOrders[i] = tmp;
            }
        }
    }

    isSwapped = true;
    while(isSwapped)
    {
        isSwapped = false;
        for (let i = 0; i < buyOrders.length - 1; i++)
        {
            if (buyOrders[i].price > buyOrders[i+1].price)
            {
                isSwapped = true;

                let tmp = buyOrders[i+1];
                buyOrders[i + 1] = buyOrders[i];
                buyOrders[i] = tmp;
            }            
        }
    }

    sellOrders.reverse();
    buyOrders.reverse();

    for(let j = 0; j < buyOrders.length-1; j++){
        if (buyOrders[j].price == buyOrders[j+1].price){
            let equalOrders = [];
            let swapped = true;
            let k = j;
            while(swapped){

                if (buyOrders[j].price == buyOrders[k].price){
                    equalOrders.push(buyOrders[k]);
                    if (k+1 == buyOrders.length){
                        swapped = false;
                    }
                    else{
                        k++;
                    }
                }
                else{
                    swapped = false;
                }
            }
            isSwapped = true;
            while(isSwapped)
            {
                isSwapped = false;
                for (let l = 0; l < equalOrders.length - 1; l++)
                {
                    if (equalOrders[l].orderPlacement > equalOrders[l+1].orderPlacement)
                    {
                        isSwapped = true;

                        let tmp = equalOrders[l+1];
                        equalOrders[l + 1] = equalOrders[l];
                        equalOrders[l] = tmp;
                    }            
                }
            }
            
            for(var l = 0; l < equalOrders.length; l++){
                buyOrders[j+l] = equalOrders[l];
            }
        }
    }

    for(let j = 0; j < sellOrders.length-1; j++){
        if (sellOrders[j].price == sellOrders[j+1].price){
            let equalOrders = [];
            let swapped = true;
            let k = j;
            while(swapped){
                if (sellOrders[j].price == sellOrders[k].price){
                    equalOrders.push(sellOrders[k]);
                    if (k+1 == sellOrders.length){
                        swapped = false;
                    }
                    else{
                        k++;
                    }
                }
                else{
                    swapped = false;
                }
            }
            isSwapped = true;
            while(isSwapped)
            {
                isSwapped = false;
                for (let l = 0; l < equalOrders.length - 1; l++)
                {
                    if (equalOrders[l].orderPlacement > equalOrders[l+1].orderPlacement)
                    {
                        isSwapped = true;

                        let tmp = equalOrders[l+1];
                        equalOrders[l + 1] = equalOrders[l];
                        equalOrders[l] = tmp;
                    }            
                }
            }
            
            for(var l = 0; l < equalOrders.length; l++){
                sellOrders[j+l] = equalOrders[l];
            }
        }
    }

    for(let k = 0; k < sellOrders.length; k++){
        for (let j = 0; j < buyOrders.length; j++){
            if (buyOrders[j].price >= sellOrders[k].price){
                if(sellOrders[k].shares !=0){
                
                    if ((buyOrders[j].shares < sellOrders[k].shares) && buyOrders[j].shares != 0){
                        const buy = await fulfillBuy(buyOrders[j], buyOrders[j].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], buyOrders[j].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], buyOrders[j].shares);
                        sellOrders[k].shares -= buyOrders[j].shares;
                        buyOrders[j].shares = 0;
                    }else if(buyOrders[j].shares > sellOrders[k].shares){
                        const buy = await fulfillBuy(buyOrders[j], sellOrders[k].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        buyOrders[j].shares -= sellOrders[k].shares;
                        sellOrders[k].shares = 0;
                    }else if(buyOrders[j].shares == sellOrders[k].shares){
                        const buy = await fulfillBuy(buyOrders[j], sellOrders[k].shares);
                        const sell = await fulfillSell(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        const add = await addToFulfilled(sellOrders[k], buyOrders[j], sellOrders[k].shares);
                        sellOrders[k].shares = 0;
                        buyOrders[j].shares = 0;
                    }
                }
            
            }
        }
    }


    async function fulfillBuy(buyOrder, shares){
        let userPortfolio = [];
        const user = await User.findById(
            buyOrder.userID,
            function(err, res){
                if(err){
                    console.log(err);
                }
                userPortfolio = res.stockPortfolio;
                console.log(res)

            }
        );
    
        let currStocks = 0
        let hasStock = false;
        for (var stock in userPortfolio){
            if (userPortfolio[stock].stockID == req.params.symbol){
                currStocks = userPortfolio[stock].shares;
                hasStock = true;
            }
        }

        if(hasStock){
            console.log("here.")
            User.updateMany(
                {_id: buyOrder.userID, 'stockPortfolio.stockID' : req.params.symbol},
                {$set: {'stockPortfolio.$.shares': currStocks+shares}},
                function(err){
                    if(err){
                        console.log(err);
                    }
                    //console.log('buyorder '+ buyOrder.userID +' fulfilled');
                }
            );
        }
        else{
            User.findByIdAndUpdate(
                buyOrder.userID,{
                $push: {stockPortfolio: {
                    stockID: req.params.symbol,
                    shares: shares
                }}}, 
                function(err){
                    if(err){
                        return res.status(422).send(err);
                    }
                    //console.log('buyorder '+ buyOrder.userID +' fulfilled');
                }
            );
        }
    }

    async function fulfillSell(sellOrder, buyOrder, shares){
        let currentFunds = 0;
        const user = await User.findById(
            sellOrder.userID,
            function(err, res){
                if(err){
                    return res.status(400).send(err);
                }
                currentFunds = res.userFunds;
            }
        );

        User.findByIdAndUpdate(sellOrder.userID,{
            $set: {userFunds: currentFunds+(buyOrder.price*shares)}}, 
            function(err){
                if(err){
                    return res.status(422).send(err);
                }
                console.log(sellOrder.userID + ': Sell '+ shares + ' to ' + buyOrder.userID + ' for ' + buyOrder.price + '. (' + (buyOrder.price*shares) + ')');
            }
        );  
    }

    async function addToFulfilled(sellOrder, buyOrder, shares){

		sellerName = ''
		const seller = await User.findById(
            sellOrder.userID,
            function(err, res){
                if(err){
                    console.log(err);
                }
                sellerName = res.username;
            }
        );

		buyerName = ''
		const buyer = await User.findById(
            buyOrder.userID,
            function(err, res){
                if(err){
                    console.log(err);
                }
                buyerName = res.username;
            }
        );

        completedOrders.push({
			day: day,
            buyerID: buyOrder.userID,
			sellerID: sellOrder.userID,
			buyerName: buyerName,
			sellerName: sellerName,
            shares: shares,
            soldFor: buyOrder.price,
            asked: sellOrder.price,
            datetime: day
        });
    }

    for(let i in sellOrders){
        if(sellOrders[i].shares != 0){
            let userPortfolio = [];
            const user = await User.findById(
                sellOrders[i].userID,
                function(err, res){
                    if(err){
                        console.log(err);
                    }
                    userPortfolio = res.stockPortfolio;
                }
            );
        
            let currStocks = 0
            let hasStock = false;
            for (let stock in userPortfolio){
                if (userPortfolio[stock].stockID == req.params.symbol){
                    currStocks = userPortfolio[stock].shares;
                    hasStock = true;
                }
            }
    
            if(hasStock){
                console.log("here.")
                User.updateMany(
                    {_id: sellOrders[i].userID, 'stockPortfolio.stockID' : req.params.symbol},
                    {$set: {'stockPortfolio.$.shares': currStocks+sellOrders[i].shares}},
                    function(err){
                        if(err){
							console.log(err);
                        }
                    }
                );
            }
            else{
                User.findByIdAndUpdate(
                    sellOrders[i].userID,{
                    $push: {stockPortfolio: {
                        stockID: req.params.symbol,
                        shares: sellOrders[i].shares
                    }}}, 
                    function(err){
                        if(err){
							console.log(err);
                        }
                    }
                );
            }

            uncompletedOrders.push({
                type: "Sell",
                userID: sellOrders[i].userID,
                shares: sellOrders[i].shares,
                price: sellOrders[i].price,
            });
        }
    }

    for(let i in buyOrders){
        if(buyOrders[i].shares != 0){
			let funds;
			
            const user = await User.findById(
                buyOrders[i].userID,
                async function(err,result){
					console.log("is there a problem?")
				
                    if(err){
                        console.log(err);
                    }
                    funds = result.userFunds;
                }
            );

            User.findByIdAndUpdate(
                buyOrders[i].userID,
                {$set:{userFunds: funds+(buyOrders[i].price*buyOrders[i].price)}},
                function(err){
                    if(err){
                        console.log(err);
                    }
                }
            );

            uncompletedOrders.push({
                type: "Buy",
                userID: buyOrders[i].userID,
                shares: buyOrders[i].shares,
                price: buyOrders[i].price,
            });
        }
    }

    Stock.findOneAndUpdate(
        {'symbol' : req.params.symbol},
        {$set: {fulfilledOrders: completedOrders}},

        function(err){
            if(err){
				console.log(err);
            }
            console.log("success");
        }
    );

	let sharesSold = 0
    for (let i in completedOrders){
        Stock.findOneAndUpdate(
            {'symbol' : req.params.symbol},
            {$push: {history: completedOrders[i]}},
    
            function(err){
                if(err){
					console.log(err);
				}
            }
        );

        User.findByIdAndUpdate(
            completedOrders[i].buyerID,
            {$push: {pBuyOrders: completedOrders[i]}},
            function(err){
                if(err){
					console.log(err);
                }
                
            }
        );

        User.findByIdAndUpdate(
            completedOrders[i].sellerID,
            {$push: {pSellOrders: completedOrders[i]}},
            function(err){
                if(err){
					console.log(err);
                }
                
			}
		);
		
		sharesSold = completedOrders[i].shares + sharesSold;
    }

    Stock.findOneAndUpdate(
        {'symbol' : req.params.symbol},
        {$set: {sellOrders: []}},

        function(err){
            if(err){
				console.log(err);
            }
        }
    );

    Stock.findOneAndUpdate(
        {'symbol' : req.params.symbol},
        {$set: {buyOrders: []}},

        function(err){
            if(err){
				console.log(err);
            }
        }
    );

	let currentAsk = stock.currentAsk;
	let currentBid = stock.currentBid;
	Stock.findOneAndUpdate({'symbol' : req.params.symbol}, {$set:{openingAsk: currentAsk}},{new:true}, function(err){
		if(err){
			return err;
		}
		console.log("success: true")
	});

	Stock.findOneAndUpdate({'symbol' : req.params.symbol}, {$set:{openingBid: currentBid}},{new:true}, function(err){
		if(err){
			return err;
		}
		console.log("success: true")
	});

	Stock.findOneAndUpdate(
		{'symbol' : req.params.symbol},
		{$push: {dailyHistory: {
			day: day,
			lowestAsk: currentAsk,
			highestBid: currentBid,
			highestAsk: highestAsk,
			lowestBid: lowestBid,
			sharesSold: sharesSold
		}}},
		function(err){
			if(err){
				console.log(err);
				return err;
			}
			console.log("success: true");
		}
	);
    res.json({success: uncompletedOrders});

});

module.exports = app;