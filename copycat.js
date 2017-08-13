'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const API = require('qpx-express');

const apiKey = 'AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg';
const qpx = new API(apiKey);


const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {

//var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."


var origin = req.body.result.parameters;
var destination = req.body.result.parameters.geo-city2;
var departureDate = req.body.result.parameters.date;

var requestData = {
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

function qpxFunction() {
    return origin;
};

qpx.getInfo(requestData, function(error, data){
	    //console.log('Heyy!', data);

		  for(var i = 0; i < data.trips.tripOption.length; i++) {
		       //JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

		        var price = data.trips.tripOption[i].pricing[0].saleTotal;
		        var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
		        console.log(carrier + ": " + price);
		  }

		  var datenSammlung =  data.trips.tripOption[0].pricing[0].fare[0].carrier;
		
});

    
    return res.json({
        speech: qpxFunction(),
        displayText: qpxFunction(),
        source: 'webhook-echo-sample'
    });


});



restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});