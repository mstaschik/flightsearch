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
		"speech": "Los gehts: ",
		"displayText": "Los gehts: ",
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
			"speech": "Test: ",
			"displayText": "Test: "
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

			let res = true;

			if (res){
				var yes = 'yes';
				resolve(yes);
			} else {
				var no = 'no';
				reject(not);
			}
		});
	};

restService.listen((process.env.PORT || 7000), function() {
	console.log("Server up and listening");
});