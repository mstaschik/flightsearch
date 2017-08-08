'use strict';

const express = require('express');
const bodyParser = require('body-parser');



const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());





restService.post('/echo', function(req, res) {




console.log('Hello World');

var API = require('qpx-express');

var apiKey = 'AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg';
var qpx = new API(apiKey);


var origin = "LHR"
var destination = "LAX"
var departureDate = "2018-01-08"

var nbody = {
    "request": {
        "passengers": { 
            "adultCount": 1 
        },
        "slice": [{
            "origin": origin,
            "destination": destination,
            "date": departureDate // YYYY-MM-DD 
        }
        ],
        "solutions": 5
    }
};

qpx.getInfo(nbody, function(error, data){
        //console.log('Heyy!', data);

  for(var i = 0; i < data.trips.tripOption.length; i++) {
       //JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

        var price = data.trips.tripOption[i].pricing[0].saleTotal;
        var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
        console.log(carrier + ": " + price);
  }
});

    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."


}

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});