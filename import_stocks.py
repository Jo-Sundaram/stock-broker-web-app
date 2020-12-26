import json 
from pymongo import MongoClient 
from bson.json_util import loads
  
  
# Making Connection 
myclient = MongoClient("mongodb://localhost:27017/")


   
# database  
db = myclient["webdevproject"] 

db.drop_collection("stocks")

   
# Created or Switched to collection  
# names: GeeksForGeeks 
Collection = db["stocks"] 
  
# Loading or Opening the json file 
json_data = '''[{
  "_id": {
    "$oid": "5fad7af586b60f59ac08ebf9"
  },
  "stockFullName": "Nike",
  "symbol": "NKE",
  "openingAsk": 5,
  "openingBid": 100,
  "currentAsk": 16,
  "currentBid": 75,
  "currHighestAsk": 32,
  "currLowestBid": 2,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1191"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 75,
      "highestAsk": 0,
      "lowestBid": 5,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b0"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a3267"
      },
      "day": 1,
      "lowestAsk": 2,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a328b"
      },
      "day": 2,
      "lowestAsk": 5,
      "highestBid": 100,
      "highestAsk": 0,
      "lowestBid": 100,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:12:05.994Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:53:11.566Z"
  }
},{
  "_id": {
    "$oid": "5fad7b2086b60f59ac08ebfa"
  },
  "stockFullName": "Apple Inc",
  "symbol": "AAPL",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1192"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b1"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a3268"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a328c"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:12:48.553Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.147Z"
  }
},{
  "_id": {
    "$oid": "5fad7b3f86b60f59ac08ebfb"
  },
  "stockFullName": "Cisco Systems Inc",
  "symbol": "CSCO",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1193"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b2"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a3269"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a328d"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:13:19.735Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.161Z"
  }
},{
  "_id": {
    "$oid": "5fad7b8186b60f59ac08ebfc"
  },
  "stockFullName": "Dow Jones Industrial Average",
  "symbol": "DOW",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1194"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b3"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326a"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a328e"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:14:25.823Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.172Z"
  }
},{
  "_id": {
    "$oid": "5fad7bac86b60f59ac08ebfd"
  },
  "stockFullName": "Microsoft Corporation",
  "symbol": "MSFT",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1195"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b4"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326b"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a328f"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:15:08.770Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.181Z"
  }
},{
  "_id": {
    "$oid": "5fad7d1986b60f59ac08ebfe"
  },
  "stockFullName": "IBM Common Stock",
  "symbol": "IBM",
  "openingAsk": 0,
  "openingBid": 7,
  "currentAsk": 0,
  "currentBid": 7,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11ae"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 7,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b5"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 7,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326c"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 7,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3290"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 7,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:21:13.591Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.192Z"
  }
},{
  "_id": {
    "$oid": "5fad7ea986b60f59ac08ebff"
  },
  "stockFullName": "Visa Inc",
  "symbol": "V",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1196"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b6"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326d"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3291"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:27:53.552Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.227Z"
  }
},{
  "_id": {
    "$oid": "5fad7ef886b60f59ac08ec00"
  },
  "stockFullName": "American Express Company",
  "symbol": "AXP",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1197"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b7"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326e"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3292"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:29:12.040Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.238Z"
  }
},{
  "_id": {
    "$oid": "5fad7f1986b60f59ac08ec01"
  },
  "stockFullName": "Amgen",
  "symbol": "AMGN",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1198"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b8"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a326f"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3293"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:29:45.123Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.246Z"
  }
},{
  "_id": {
    "$oid": "5fad7f3986b60f59ac08ec02"
  },
  "stockFullName": "Boeing Co",
  "symbol": "BA",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b1199"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11b9"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d67f6ef4d45a735a3270"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3294"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:30:17.751Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.255Z"
  }
},{
  "_id": {
    "$oid": "5fad7f5b86b60f59ac08ec03"
  },
  "stockFullName": "Caterpillar Inc.",
  "symbol": "CAT",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119a"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11ba"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3271"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3295"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:30:51.224Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.263Z"
  }
},{
  "_id": {
    "$oid": "5fad802486b60f59ac08ec05"
  },
  "stockFullName": "Chevron Corporation",
  "symbol": "CVX",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119b"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11bb"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3272"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3296"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:34:12.851Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.291Z"
  }
},{
  "_id": {
    "$oid": "5fad811d20a6a356140108e8"
  },
  "stockFullName": "Goldman Sachs Group Inc",
  "symbol": "GS",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119c"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11bc"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3273"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3297"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:38:21.996Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.305Z"
  }
},{
  "_id": {
    "$oid": "5fad817c20a6a356140108e9"
  },
  "stockFullName": "Home Depot Inc",
  "symbol": "HD",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119d"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11bd"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3274"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3298"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:39:56.789Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.313Z"
  }
},{
  "_id": {
    "$oid": "5fad81b520a6a356140108ea"
  },
  "stockFullName": "Honeywell International Inc.",
  "symbol": "HON",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119e"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11be"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3275"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a3299"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:40:53.878Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.321Z"
  }
},{
  "_id": {
    "$oid": "5fad83f320a6a356140108ec"
  },
  "stockFullName": "Intel Coprporation",
  "symbol": "INT",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b119f"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11bf"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3276"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329a"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:50:27.521Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.328Z"
  }
},{
  "_id": {
    "$oid": "5fad846a20a6a356140108ed"
  },
  "stockFullName": "Johnson & Johnson",
  "symbol": "JNJ",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a0"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c0"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3277"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329b"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:52:26.431Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.349Z"
  }
},{
  "_id": {
    "$oid": "5fad848620a6a356140108ee"
  },
  "stockFullName": "Coca-Cola Co",
  "symbol": "KO",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a1"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c1"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3278"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329c"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:52:54.870Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.375Z"
  }
},{
  "_id": {
    "$oid": "5fad84a220a6a356140108ef"
  },
  "stockFullName": "JPMorgan Chase & Co.",
  "symbol": "JPM",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a2"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c2"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3279"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329d"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:53:22.540Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.391Z"
  }
},{
  "_id": {
    "$oid": "5fad858620a6a356140108f1"
  },
  "stockFullName": "McDonald's Corp",
  "symbol": "MCD",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a3"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c3"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327a"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329e"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:57:10.864Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.402Z"
  }
},{
  "_id": {
    "$oid": "5fad85b720a6a356140108f2"
  },
  "stockFullName": "3M Co",
  "symbol": "MMM",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a4"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c4"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327b"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a329f"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:57:59.765Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.424Z"
  }
},{
  "_id": {
    "$oid": "5fad85d320a6a356140108f3"
  },
  "stockFullName": "Merck & Co., Inc.",
  "symbol": "MRK",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a5"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c5"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327c"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a0"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:58:27.014Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.457Z"
  }
},{
  "_id": {
    "$oid": "5fad85ef20a6a356140108f4"
  },
  "stockFullName": "Procter & Gamble Co",
  "symbol": "PG",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a6"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c6"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327d"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a1"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:58:55.525Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.465Z"
  }
},{
  "_id": {
    "$oid": "5fad860820a6a356140108f5"
  },
  "stockFullName": "Travelers Companies Inc",
  "symbol": "TRV",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a7"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c7"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327e"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a2"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T18:59:20.138Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.470Z"
  }
},{
  "_id": {
    "$oid": "5fad863520a6a356140108f6"
  },
  "stockFullName": "UnitedHealth Group Inc",
  "symbol": "UNH",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a8"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c8"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a327f"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a3"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:00:05.052Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.474Z"
  }
},{
  "_id": {
    "$oid": "5fad878c20a6a356140108f8"
  },
  "stockFullName": "salesforce.com, inc.",
  "symbol": "CRM",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11a9"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11c9"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3280"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a4"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:05:48.302Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.478Z"
  }
},{
  "_id": {
    "$oid": "5fad87ae20a6a356140108f9"
  },
  "stockFullName": "Verizon Communications Inc.",
  "symbol": "VZ",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11aa"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11ca"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3281"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a5"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:06:22.159Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.491Z"
  }
},{
  "_id": {
    "$oid": "5fad883720a6a356140108fc"
  },
  "stockFullName": "Walgreens Boots Alliance Inc",
  "symbol": "WBA",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11ab"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11cb"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3282"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a6"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:08:39.867Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.495Z"
  }
},{
  "_id": {
    "$oid": "5fad885820a6a356140108fd"
  },
  "stockFullName": "Walmart Inc",
  "symbol": "WMT",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11ac"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11cc"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3283"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a7"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:09:12.301Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.500Z"
  }
},{
  "_id": {
    "$oid": "5fad887420a6a356140108fe"
  },
  "stockFullName": " Walt Disney Co",
  "symbol": "DIS",
  "openingAsk": 0,
  "openingBid": 0,
  "currentAsk": 0,
  "currentBid": 0,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [],
  "buyOrders": [],
  "history": [],
  "dailyHistory": [
    {
      "_id": {
        "$oid": "5fc9d5d3f3977557ed8b11ad"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d5e5f3977557ed8b11cd"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d6806ef4d45a735a3284"
      },
      "day": 1,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    },
    {
      "_id": {
        "$oid": "5fc9d7096ef4d45a735a32a8"
      },
      "day": 2,
      "lowestAsk": 0,
      "highestBid": 0,
      "highestAsk": 0,
      "lowestBid": 0,
      "sharesSold": 0
    }
  ],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-11-12T19:09:40.103Z"
  },
  "updatedAt": {
    "$date": "2020-12-04T06:28:25.504Z"
  }
},{
  "_id": {
    "$oid": "5fc9d1fa408d2f2e64dad074"
  },
  "stockFullName": "Tesla",
  "symbol": "TSLA",
  "openingAsk": 5,
  "openingBid": 100,
  "currentAsk": 16,
  "currentBid": 75,
  "currHighestAsk": 0,
  "currLowestBid": 0,
  "eventSubscriptions": [],
  "sellOrders": [
    {
      "_id": {
        "$oid": "5fcaf239ffc982555012c864"
      },
      "orderID": "3UQ439Qz9xCW",
      "orderPlacement": 1,
      "userID": "5f999d70b697054d9cbffbbc",
      "shares": 15,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5fcaf25bffc982555012c866"
      },
      "orderID": "z4sGWbJa30JZ",
      "orderPlacement": 2,
      "userID": "5f999d97b697054d9cbffbbe",
      "shares": 18,
      "price": 16
    },
    {
      "_id": {
        "$oid": "5fcaf2d5ffc982555012c86c"
      },
      "orderID": "BgxoUeFrg4tE",
      "orderPlacement": 3,
      "userID": "5f99a78fb0575273fccc4d67",
      "shares": 12,
      "price": 19
    },
    {
      "_id": {
        "$oid": "5fcaf300ffc982555012c871"
      },
      "orderID": "LoNj3C86SjlD",
      "orderPlacement": 4,
      "userID": "5f999db8b697054d9cbffbc2",
      "shares": 19,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5fcaf454ffc982555012c87c"
      },
      "orderID": "9g0DGICY6Zfq",
      "orderPlacement": 5,
      "userID": "5f999ddeb697054d9cbffbc6",
      "shares": 10,
      "price": 16
    }
  ],
  "buyOrders": [
    {
      "_id": {
        "$oid": "5fcaf236ffc982555012c862"
      },
      "orderID": "8kymu2ErAKbT",
      "orderPlacement": 2,
      "userID": "5f99a6fecf30786874cdde76",
      "shares": 12,
      "price": 75
    },
    {
      "_id": {
        "$oid": "5fcaf25fffc982555012c868"
      },
      "orderID": "lU1wkNXbDkAr",
      "orderPlacement": 3,
      "userID": "5f99a70acf30786874cdde78",
      "shares": 18,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5fcaf283ffc982555012c86a"
      },
      "orderID": "sPyaspmTNHtg",
      "orderPlacement": 4,
      "userID": "5f99a76bb0575273fccc4d64",
      "shares": 5,
      "price": 34
    },
    {
      "_id": {
        "$oid": "5fcaf2feffc982555012c86f"
      },
      "orderID": "RrO5G9kV16Fs",
      "orderPlacement": 5,
      "userID": "5f999da7b697054d9cbffbc0",
      "shares": 32,
      "price": 12
    },
    {
      "_id": {
        "$oid": "5fcaf338ffc982555012c873"
      },
      "orderID": "RMg6GmgkukFt",
      "orderPlacement": 6,
      "userID": "5f99a7a1b0575273fccc4d69",
      "shares": 7,
      "price": 20
    },
    {
      "_id": {
        "$oid": "5fcaf368ffc982555012c875"
      },
      "orderID": "AtB5acjjgQnf",
      "orderPlacement": 7,
      "userID": "5f99a7acb0575273fccc4d6b",
      "shares": 6,
      "price": 32
    },
    {
      "_id": {
        "$oid": "5fcaf395ffc982555012c877"
      },
      "orderID": "WukLNGs9osxU",
      "orderPlacement": 8,
      "userID": "5f99a7c0b0575273fccc4d6d",
      "shares": 9,
      "price": 21
    },
    {
      "_id": {
        "$oid": "5fcaf3bcffc982555012c879"
      },
      "orderID": "bDjDQnb7OWwN",
      "orderPlacement": 9,
      "userID": "5f99a7ceb0575273fccc4d6e",
      "shares": 18,
      "price": 2
    }
  ],
  "history": [],
  "fulfilledOrders": [],
  "unfulfilledOrders": [],
  "createdAt": {
    "$date": "2020-12-04T06:06:50.850Z"
  },
  "updatedAt": {
    "$date": "2020-12-05T02:45:40.996Z"
  }
}]'''

data = loads(json_data)
      
# Inserting the loaded data in the Collection 
# if JSON contains data more than one entry 
# insert_many is used else inser_one is used 
if isinstance(data, list): 
    Collection.insert_many(data)   
else: 
    Collection.insert_one(data) 