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

qpx.getInfo(body, function (error, data){
	    //console.log('Heyy!', data);

	    for(var i = 0; i < data.trips.tripOption.length; i++) {
		       //JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

		       var price = data.trips.tripOption[i].pricing[0].saleTotal;
		       var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
		       console.log(carrier + ": " + price);
		   }
		   var msg = data.trips.tripOption[0].pricing[0].fare[0].carrier


		});

    //var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    
    return res.json({
"speech": "",
"messages": [
{
"type": 0,
"speech": 'Moment...'
},
{
"type": 0,
"speech": qpxFunction(),
}
],
"source": 'webhook-echo-sample'
});


});


restService.listen((process.env.PORT || 8000), function() {
	console.log("Server up and listening");
});
