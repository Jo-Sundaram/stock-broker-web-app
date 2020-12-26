// const router = require('express').Router();
const express = require("express");
let Stock = require('../models/stock.model');
const app = express.Router();

/* app.get("/", async(req,res) => {
    const stocks = await Stock.find();
    res.send(stocks);
}); */

app.get("/", async(req,res)=>{

    console.log(req.query);
    console.log(Object.keys(req.query).length);


    if(Object.keys(req.query).length==0){
        const stocks = await Stock.find();
        res.send(stocks);
    }

    else {
        let symbol = '';
        let minprice =0;
        let maxprice = Number.MAX_SAFE_INTEGER;
   
        req.query.hasOwnProperty('symbol')?symbol=req.query['symbol']:''
        req.query.hasOwnProperty('minprice')?minprice= parseInt(req.query['minprice']):0;
        req.query.hasOwnProperty('maxprice')?maxprice = parseInt(req.query['maxprice']):Number.MAX_SAFE_INTEGER;

        var stocks;
        if(symbol!=''){
            stocks = await Stock.find({
            'symbol': {'$regex': symbol, '$options': 'i'},
            'currentAsk':{$gte:minprice, $lte: maxprice},
           });
        }else{
                stocks = await Stock.find({
                'currentAsk':{$gte:minprice, $lte: maxprice},
            });
        }
       
        if(!stocks){
            res.send("No stock symbols found");
        }else{
                res.send(stocks)
        }
    }

});

app.get("/:symbol", async(req,res) => {

	console.log(req.query);
    console.log(Object.keys(req.query).length);
    if(Object.keys(req.query).length==0){
        const stock = await Stock.findOne({
          'symbol' : req.params.symbol
        })
        .then((stock)=>{
            res.json({
                lowestAsk: stock.currentAsk,
                highestBid: stock.currentBid,
                highestAsk: stock.currHighestAsk,
                lowestBid: stock.currLowestBid
		    })
        })
        .catch((err)=>{
            res.send("No data for this stock");
        });
        //const stocks = await Stock.find();
        
	}
	else{
        let startday = 0;
        let endday = 0;

		let request = []
   
        req.query.hasOwnProperty('startday')?startday= parseInt(req.query['startday']):0;
		req.query.hasOwnProperty('endday')?endday = parseInt(req.query['endday']):0;
        
        const stock = await Stock.findOne({
            'symbol' : req.params.symbol
          })
          .then((stock)=>{
		if(endday == 0 || endday<startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day >= startday){
					request.push(stock.dailyHistory[i])
				}
			}
		}
		else if(endday>startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day >= startday && stock.dailyHistory[i].day <= endday){
					request.push(stock.dailyHistory[i]);
				}
			}
		}
		else if (endday == startday){
			for(let i in stock.dailyHistory){
				if(stock.dailyHistory[i].day == startday){
					request.push(stock.dailyHistory[i]);
				}
			}
        }
        res.json(request);
    })
    .catch((err)=>{
        res.send("Could not fetch data for stock");
    })
		
	}
    //res.send(stock);
});


app.get("/:symbol/history", async(req,res) => {
    if(Object.keys(req.query)==0){
        const stock = await Stock.findOne({'symbol' : req.params.symbol})
        .then((stock)=>{
            res.send(stock.history);
        })
        .catch((err)=>{
            res.send("No data for this stock");
        });
        return;
       
    }else{

        let startday = 0;
        let endday = 0; 
        var request=[];
        console.log(req.query);

        req.query.hasOwnProperty('startday') ? startday =parseInt(req.query['startday']) : 0;
        req.query.hasOwnProperty('endday') ? endday = parseInt(req.query['endday']) :0; 

        const stock = await Stock.findOne({
            'symbol':req.params.symbol,
			})
            .then((stock)=>{
                if(endday == 0 || endday<startday){
                    for(let i in stock.history){
                        if(stock.history[i].day >= startday){
							console.log('.');
                            request.push(stock.history[i])
                        }
                    }
                }
                else if(endday>startday){
                    for(let i in stock.history){
                        if(stock.history[i].day >= startday && stock.history[i].day <= endday){
                            request.push(stock.history[i]);
                        }
                    }
                }
                else if (endday == startday){
                    for(let i in stock.history){
                        if(stock.history[i].day == startday){
                            request.push(stock.history[i]);
                        }
                    }
                }
                res.json(request);
            })
            .catch((err)=>{
                res.send("Could not fetch data for stock");
            })
    }
});

app.get("/:symbol/info", async(req,res) => {
    const stock = await Stock.findOne({'symbol' : req.params.symbol})
            .then((stock)=>{
                res.send(stock);
            })
            .catch((err)=>{
                res.send("Stock not found")
            });

});

app.get("/array/0", async(req,res) => {
	console.log("???");
	if(Object.keys(req.query)==0){
        const stock = await Stock.findOne({'symbol' : req.params.symbol})
        .then((stock)=>{
            res.send("Nothing to get");
        })
        .catch((err)=>{
            res.send("No data for this stock");
        });
        return;
       
    }else{
		let allStocks = [];
		req.query.hasOwnProperty('array') ? allStocks =JSON.parse(req.query.array) : 0;
		console.log(allStocks);
		let returnStocks = []
		for(var i in allStocks){
			console.log(allStocks[i]);
			let stock = await Stock.findOne({'symbol' : allStocks[i]});
			returnStocks.push({
				symbol: stock.symbol,
				currentAsk: stock.currentAsk,
				currentBid: stock.currentBid,
			});
		}
		res.send({stocks: returnStocks});
	}
})

app.post("/add",function(req,res){

    const stockFullName = req.body.stockFullName;
    const symbol = req.body.symbol;
    const openingAsk = req.body.openingAsk;
    const openingBid = req.body.openingBid;
    const currentAsk = 0;
    const currentBid = 0;
    const currHighestAsk = 0;
	const currLowestBid = 0;
	const eventSubscriptions = [];
	const sellOrders = [];
	const buyOrders = [];
	const history = [];
	const dailyHistory = [];
	const fulfilledOrders = [];
	const unfulfilledOrders = [];


    const newStock = new Stock({
        stockFullName,
        symbol,
        openingAsk,
        openingBid,
        currentAsk,
        currentBid,
        currHighestAsk,
		currLowestBid,
		eventSubscriptions,
		sellOrders,
		buyOrders,
		history,
		dailyHistory,
		fulfilledOrders,
		unfulfilledOrders
    });

    newStock.save()
        .then(() => res.json('Stock added to the database'))
        .catch(err => res.status(400).json('Error: ' + err));

})

app.post("/update/:symbol", function(req,res){
    Stock.findOneAndUpdate({"symbol":req.params.symbol}, {$set:req.body},{new:true}, function(err){
        if(err){
            return res.status(400).send(err);
        }
        res.json({success: true});
    });
});


module.exports = app;