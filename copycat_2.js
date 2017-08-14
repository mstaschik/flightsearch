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


	var origin = req.body.result.parameters['Flughafen1'];
	var destination = req.body.result.parameters['Flughafen2']
	var departureDate = req.body.result.parameters['date']

	var body = {
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
    	var flightdates = "Abflug: " + origin + " Ziel: " + destination + " Datum: " + departureDate;
    	return flightdates;
    }
    var values = qpxFunction();


    callQPXApi(origin, destination, departureDate).then((output) => {

    	return res.json({
    		"speech": "Los gehts: " + output,
    		"displayText": "Los gehts: " + output,
    		"messages": [
    		{
    			"type": 0,
    			"speech": "Einen Moment bitte...",
    			"displayText": "Einen Moment bitte..."
    		},
    		{
    			"type": 0,
    			"speech": "Das müsste der günstigste Flug sein:",
    			"displayText": "Das müsste der günstigste Flug sein:"
    		},
    		{
    			"type": 0,
    			"speech": "Test: " + values,
    			"displayText": "Test: " + values
    		},
    		{
    			"type": 0,
    			"speech": "Möchtest du diesen Flug jetzt buchen?",
    			"displayText": "Möchtest du diesen Flug jetzt buchen?"
    		}
    		],
    		"source": "webhook-echo-sample"
    	});

    });


    function callQPXApi(origin, destination, departureDate) {

    	return new Promise((resolve, reject) => {

    		qpx.getInfo(body, function (error, data){
		    //console.log('Heyy!', data);
		    var msg = data.trips.tripOption[0].pricing[0].fare[0].carrier


		    // for(var i = 0; i < data.trips.tripOption.length; i++) {
			   //     //JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

			   //     var price = data.trips.tripOption[i].pricing[0].saleTotal;
			   //     var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
			   //     console.log(carrier + ": " + price);
			   // }


			});
			   var output = 'hi'
			   console.log(output);
			   resolve(output);
    //var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
		});

    }



    restService.listen((process.env.PORT || 7000), function() {
    	console.log("Server up and listening");
    });