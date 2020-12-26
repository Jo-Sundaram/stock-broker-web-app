import json 
from pymongo import MongoClient 
from bson.json_util import loads
  
  
# Making Connection 
myclient = MongoClient("mongodb://localhost:27017/")  
   
# database  
db = myclient["webdevproject"] 

db.drop_collection("users")
   
# Created or Switched to collection  
# names: GeeksForGeeks 
Collection = db["users"] 
  
# Loading or Opening the json file 
json_data = '''[{
  "_id": {
    "$oid": "5f999d70b697054d9cbffbbc"
  },
  "username": "Jothika",
  "email": "jo@admin.com",
  "password": "badpassword",
  "userFunds": 10400,
  "notifications": [
    {
      "_id": {
        "$oid": "5fc9d70a6ef4d45a735a32ae"
      },
      "notification": "You bought 5 shares of TSLA for $100 from Anwar"
    }
  ],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999d70b697054d9cbffbbd"
      },
      "stockID": "TSLA",
      "shares": 55
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32ab"
      },
      "day": 2,
      "buyerID": "5f999d70b697054d9cbffbbc",
      "sellerID": "5f999d97b697054d9cbffbbe",
      "buyerName": "Jothika",
      "sellerName": "Anwar",
      "shares": 5,
      "soldFor": 100,
      "asked": 5,
      "datetime": "2"
    }
  ],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5fcaf239ffc982555012c863"
      },
      "orderID": "3UQ439Qz9xCW",
      "stockID": "TSLA",
      "shares": 15,
      "price": 32
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:33:52.060Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:36:41.145Z"
  },
  "__v": 0,
  "fundsHistory": [
    {
      "_id": {
        "$oid": "5fc9d6f06ef4d45a735a3286"
      },
      "type": "Deposit",
      "amount": 1000
    }
  ]
},{
  "_id": {
    "$oid": "5f999d97b697054d9cbffbbe"
  },
  "username": "Anwar",
  "email": "anwar@admin.com",
  "password": "badpassword",
  "userFunds": 500,
  "notifications": [
    {
      "_id": {
        "$oid": "5fc9d70a6ef4d45a735a32af"
      },
      "notification": "You sold 5 shares of TSLA for $100 to Jothika"
    }
  ],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999d97b697054d9cbffbbf"
      },
      "stockID": "TSLA",
      "shares": 9
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5fcaf25bffc982555012c865"
      },
      "orderID": "z4sGWbJa30JZ",
      "stockID": "TSLA",
      "shares": 18,
      "price": 16
    }
  ],
  "pSellOrders": [
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32ac"
      },
      "day": 2,
      "buyerID": "5f999d70b697054d9cbffbbc",
      "sellerID": "5f999d97b697054d9cbffbbe",
      "buyerName": "Jothika",
      "sellerName": "Anwar",
      "shares": 5,
      "soldFor": 100,
      "asked": 5,
      "datetime": "2"
    }
  ],
  "createdAt": {
    "$date": "2020-10-28T16:34:31.804Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:37:15.796Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999da7b697054d9cbffbc0"
  },
  "username": "Hamza",
  "email": "hamza@admin.com",
  "password": "badpassword",
  "userFunds": 616,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999da7b697054d9cbffbc1"
      },
      "stockID": "TSLA",
      "shares": 4
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf2feffc982555012c86e"
      },
      "orderID": "RrO5G9kV16Fs",
      "stockID": "TSLA",
      "shares": 32,
      "price": 12
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:34:47.104Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:39:58.132Z"
  },
  "__v": 0,
  "fundsHistory": [
    {
      "_id": {
        "$oid": "5fcaf2eaffc982555012c86d"
      },
      "type": "Deposit",
      "amount": 1000
    }
  ]
},{
  "_id": {
    "$oid": "5f999db8b697054d9cbffbc2"
  },
  "username": "Nikhail",
  "email": "nikhail@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999db8b697054d9cbffbc3"
      },
      "stockID": "TSLA",
      "shares": 312
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5fcaf300ffc982555012c870"
      },
      "orderID": "LoNj3C86SjlD",
      "stockID": "TSLA",
      "shares": 19,
      "price": 32
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:04.705Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:40:00.260Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f999dcbb697054d9cbffbc4"
  },
  "username": "Mirah",
  "email": "mirah@admin.com",
  "password": "badpassword",
  "userFunds": 1000,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999dcbb697054d9cbffbc5"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:23.879Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:35:08.145Z"
  },
  "__v": 0,
  "fundsHistory": [
    {
      "_id": {
        "$oid": "5fcaf1dcffc982555012c85e"
      },
      "type": "Deposit",
      "amount": 1000
    }
  ]
},{
  "_id": {
    "$oid": "5f999ddeb697054d9cbffbc6"
  },
  "username": "shane",
  "email": "shane@admin.com",
  "password": "badpassword",
  "userFunds": 0,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f999ddeb697054d9cbffbc7"
      },
      "stockID": "TSLA",
      "shares": 10
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5fcaf454ffc982555012c87b"
      },
      "orderID": "9g0DGICY6Zfq",
      "stockID": "TSLA",
      "shares": 10,
      "price": 16
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T16:35:42.600Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:45:40.994Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a6fecf30786874cdde76"
  },
  "username": "samee",
  "email": "samee@admin.com",
  "password": "badpassword",
  "userFunds": 200,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a6fecf30786874cdde77"
      },
      "stockID": "TSLA",
      "shares": 2
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf236ffc982555012c861"
      },
      "orderID": "8kymu2ErAKbT",
      "stockID": "TSLA",
      "shares": 12,
      "price": 75
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:14:38.859Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:36:38.705Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a70acf30786874cdde78"
  },
  "username": "musa",
  "email": "musa@admin.com",
  "password": "badpassword",
  "userFunds": 848,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf25fffc982555012c867"
      },
      "orderID": "lU1wkNXbDkAr",
      "stockID": "TSLA",
      "shares": 18,
      "price": 32
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:14:50.512Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:37:19.487Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a76bb0575273fccc4d64"
  },
  "username": "martin",
  "email": "martin@admin.com",
  "password": "badpassword",
  "userFunds": 1660,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf283ffc982555012c869"
      },
      "orderID": "sPyaspmTNHtg",
      "stockID": "TSLA",
      "shares": 5,
      "price": 34
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:16:27.913Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:37:55.830Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a78fb0575273fccc4d67"
  },
  "username": "HamzaS",
  "email": "hamzas@admin.com",
  "password": "badpassword",
  "userFunds": 1616,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a78fb0575273fccc4d68"
      },
      "stockID": "TSLA",
      "shares": 22
    }
  ],
  "unpBuyOrders": [],
  "pBuyOrders": [],
  "unpSellOrders": [
    {
      "_id": {
        "$oid": "5fcaf2d5ffc982555012c86b"
      },
      "orderID": "BgxoUeFrg4tE",
      "stockID": "TSLA",
      "shares": 12,
      "price": 19
    }
  ],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:03.301Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:39:17.898Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7a1b0575273fccc4d69"
  },
  "username": "Matt",
  "email": "matt@admin.com",
  "password": "badpassword",
  "userFunds": 1720,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a7a1b0575273fccc4d6a"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf338ffc982555012c872"
      },
      "orderID": "RMg6GmgkukFt",
      "stockID": "TSLA",
      "shares": 7,
      "price": 20
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:21.209Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:40:56.912Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7acb0575273fccc4d6b"
  },
  "username": "Tal",
  "email": "tal@admin.com",
  "password": "badpassword",
  "userFunds": 1616,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [
    {
      "_id": {
        "$oid": "5f99a7acb0575273fccc4d6c"
      },
      "stockID": "TSLA",
      "shares": 1
    }
  ],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf368ffc982555012c874"
      },
      "orderID": "AtB5acjjgQnf",
      "stockID": "TSLA",
      "shares": 6,
      "price": 32
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:32.551Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:41:44.715Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7c0b0575273fccc4d6d"
  },
  "username": "Carter",
  "email": "carter@admin.com",
  "password": "badpassword",
  "userFunds": 1622,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf395ffc982555012c876"
      },
      "orderID": "WukLNGs9osxU",
      "stockID": "TSLA",
      "shares": 9,
      "price": 21
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:17:52.627Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:42:29.914Z"
  },
  "__v": 0
},{
  "_id": {
    "$oid": "5f99a7ceb0575273fccc4d6e"
  },
  "username": "Nikita",
  "email": "nikita@admin.com",
  "password": "badpassword",
  "userFunds": 1928,
  "notifications": [],
  "eventSubscriptions": [],
  "watchlistCollection": [],
  "stockPortfolio": [],
  "unpBuyOrders": [
    {
      "_id": {
        "$oid": "5fcaf3bcffc982555012c878"
      },
      "orderID": "bDjDQnb7OWwN",
      "stockID": "TSLA",
      "shares": 18,
      "price": 2
    }
  ],
  "pBuyOrders": [],
  "unpSellOrders": [],
  "pSellOrders": [],
  "createdAt": {
    "$date": "2020-10-28T17:18:06.115Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:43:08.568Z"
  },
  "__v": 0
}]'''

data = loads(json_data)
      
# Inserting the loaded data in the Collection 
# if JSON contains data more than one entry 
# insert_many is used else inser_one is used 
if isinstance(data, list): 
    Collection.insert_many(data)   
else: 
    Collection.insert_one(data) 