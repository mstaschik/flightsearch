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

	callQPXApi().then(function(output) {

		return res.json({
			"speech": "Preis: " + output,
			"displayText": "Preis: " + output,
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
				"speech": "Preis: " + output,
				"displayText": "Preis: " + output
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


});

var callQPXApi = function() {

	return new Promise(function(resolve, reject) {

		var origin = "LHR"
		var destination = "LAX"
		var departureDate = "2018-01-08"

		var body = {
			"request": {
				"passengers": { 
					"adultCount": 1 
				},
				"slice": [{
					"origin": origin,
					"destination": destination,
					"date": departureDate /* YYYY-MM-DD */
				}
				],
				"solutions": 5
			}
		}

		qpx.getInfo(body, function(error, data){
			/*console.log('Heyy!', data);*/

			for(var i = 0; i < data.trips.tripOption.length; i++) {
				/*JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);*/

				var price = data.trips.tripOption[i].pricing[0].saleTotal;
				var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
				console.log(carrier + ": " + price);

			}
			var yes = data.trips.tripOption[0].pricing[0].saleTotal + " Carrier: " + data.trips.tripOption[i].pricing[0].fare[0].carrier;
			resolve(yes);
		});
	});
};

restService.listen((process.env.PORT || 7000), function() {
	console.log("Server up and listening");
});