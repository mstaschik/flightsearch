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
	var destination = req.body.result.parameters['Flughafen2'];
	var departureDate = req.body.result.parameters['date'];

	callQPXApi().then(function(price, carrier) {

		return res.json({
			"speech": "Preis: " + price + " Carrier: " + carrier,
			"displayText": "Preis: " + price + " Carrier: " + carrier,
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
				"speech": "Preis: " + price + " Carrier: " + carrier,
				"displayText": "Preis: " + price + " Carrier: " + carrier
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

		var reqData = {
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

		qpx.getInfo(reqData, function(error, data){
			/*console.log('Heyy!', data);*/

			for(var i = 0; i < data.trips.tripOption.length; i++) {
				/*JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);*/

				let price = data.trips.tripOption[i].pricing[0].saleTotal;
				let carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
				console.log(carrier + ": " + price);

			}
			var price = data.trips.tripOption[0].pricing[0].saleTotal;
			var carrier = data.trips.tripOption[0].pricing[0].fare[0].carrier;
			resolve(price, carrier);
		});
	});
};

restService.listen((process.env.PORT || 7000), function() {
	console.log("Server up and listening");
});