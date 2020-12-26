//const router = require('express').Router();
//const { watch } = require('../models/user.model');
const express = require("express");
let User = require('../models/user.model');
let Stock = require('../models/stock.model');
const app = express.Router();
const passport = require("passport")
const jwt = require("jsonwebtoken")

app.get("/", async(req,res) => {
    const stocks = await User.find();
    res.send(stocks);
});

app.get("/:id", async(req,res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
});



app.post("/register", function(req,res) {
    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,
        userFunds: 2000,
        notifications: [],
        eventSubscriptions: [],
        watchlistCollection: [],
        stockPortfolio: req.body.stockPortfolio,
        unpBuyOrders: [],
        pBuyOrders: [],
        unpSellOrders: [],
        pSellOrders: []
    });

    newUser.save(function(err){
        if(err){
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username/email
                return res.status(400).send({ success: false, message: 'User/Email already exist!' });
              }
        
              // Some other error
              return res.status(400).send(err);
            }
        res.send(newUser);
    });
});

app.post("/add", function(req,res) {
    const newUser = new User({
        username : req.body.username,
        email: req.body.email,
        password: req.body.password,
        userFunds: 2000,
        notifications: [],
        eventSubscriptions: [],
        watchlistCollection: [],
        stockPortfolio: [],
        unpBuyOrders: [],
        pBuyOrders: [],
        unpSellOrders: [],
        pSellOrders: []
    });

    newUser.save(function(err){
        if(err){
            if (err.name === 'MongoError' && err.code === 11000) {
                // Duplicate username/email
                return res.status(400).send({ success: false, message: 'User/Email already exist!' });
              }
        
              // Some other error
              return res.status(400).send(err);
            }
        res.send(newUser);
    });
});

app.post("/update/:id", function(req,res){
	console.log(req.body)
    User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true}, function(err){
        if(err){
            return res.status(400).send(err);
        }
        res.json({success: true});
    });
});

app.get("/:id/ES", function(req,res){
    User.findById(req.params.id, function(err, result){
        if(err){
            return res.status(400).send(err);
        }
        res.json(result.eventSubscriptions);
    });
});

//note: withdraw too much
app.post("/:id/updateFunds", passport.authenticate("jwt", { session: false }),function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.findByIdAndUpdate(
			req.params.id,
			{$set: {userFunds: req.body.userFunds}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
			}
		);
		console.log("?");

		User.findByIdAndUpdate(
			req.params.id,
			{$push: {fundsHistory:{
				type: req.body.type,
				amount: req.body.amount
				}}
			},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
				console.log(req.body.type);
				res.json({success: true});
			}
		);
	}
    
});

//add an empty watchlist to collection
app.post("/:id/watchlist/add", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		res.json({
		  username: "nobody"
		})
	} else {
		User.findByIdAndUpdate(
			req.params.id,{
			$push: {watchlistCollection: {
				name: req.body.name,
				watchlist:[],
			}}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
				res.json({success: true});
			}
		);
	}
});

//get entire watchlist collection
app.get("/:id/watchlist/", async(req,res)=>{

    const user = await User.findById(req.params.id)
    .catch((err)=>{
        return res.send("user not found");
    })
    
    res.send(user.watchlistCollection);
    
    
});

// // get single watchlist
app.get('/:id/watchlist/:wid', passport.authenticate("jwt", { session: false }), async function(req, res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		const user = await User.findById(req.params.id)
		.catch((err)=>{
			return res.send("user not found");
		})
	

		let collection = user.watchlistCollection;

		collection.forEach(element => {
			if(element.name==req.params.wid){

				res.send(element);
			}
		
		});
	}
});

// // add stock to a watchlist 
app.post("/:id/watchlist/update/add", passport.authenticate("jwt", { session: false }), async function(req, res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
			console.log("searching collection");
			
			
			const user =  User.findById(req.params.id)
				.catch((err)=>{
					return res.send("user not found");
				})
				.then((user)=>{
				
					let collection = user.watchlistCollection;
					let list;
					let exists = 0;
					
					collection.forEach(element => {
						if(element.name==req.body.name){
							console.log(element.name);
							console.log("hi");
							
							list = element;
						}
					
					});

					console.log("watchlist");

					for(let i = 0; i < list["watchlist"].length;i++){
						if(list["watchlist"][i].stockID == req.body.stockID){
							console.log(req.body.stockID);
							res.json({success:false});
							exists=1;
							break;
						}

					}
					
					if(exists==1){
						console.log("Stock already exists");
						return;
					}

					const stock  =  Stock.findOne({'symbol':req.body.stockID})
					.then((stock)=>{
						console.log("this stock: " + stock.stockFullName)
					

					})

					User.updateMany(
						{_id: req.params.id, 'watchlistCollection.name': req.body.name},
						{$push:{'watchlistCollection.$.watchlist':
							{
								stockID: req.body.stockID,
								stockName: stock.stockFullName,
								sharesOwned:0,
								avgBid:stock.currentBid,
								currAsk : stock.currHighestAsk,
							}
					}},
						function(err){
							if(err){
								return res.status(400).send(err);
							}
							console.log("added");
							res.json({success: true});
						}
					);
			});
		}
});

// remove stock from a watchlist 
app.delete("/:id/watchlist/update/remove", passport.authenticate("jwt", { session: false }), function(req,res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.updateMany(
			{_id: req.params.id, 'watchlistCollection.name': req.body.name},
			{$pull : {'watchlistCollection.$.watchlist' : 
				{stockID: req.body.stockID
			}}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
				res.json({success: true});
			}
		);
	}
});

// // remove a watchlist from the collection
app.delete('/:id/watchlist/remove', passport.authenticate("jwt", { session: false }), function(req, res){
	if(!req.user){
		return res.status(401).send("Unauthorized");
	} else {
		User.findByIdAndUpdate(
			req.params.id,
			{$pull: {watchlistCollection: {
				name: req.body.name
			}}},
			function(err){
				if(err){
					return res.status(400).send(err);
				}
				res.json({success: true});
			}
		);
	}
});
	   




module.exports = app;