'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const request = require("request")

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());





restService.post('/echo', function(req, res) {




    // JSON to be passed to the QPX Express API
    var requestData = {
        "request": {
            "slice": [
            {
                "origin": "ZRH",
                "destination": "DUS",
                "date": "2018-12-02"
            }
            ],
            "passengers": {
                "adultCount": 1,
                "infantInLapCount": 0,
                "infantInSeatCount": 0,
                "childCount": 0,
                "seniorCount": 0
            },
            "solutions": 2,
            "refundable": false
        }
    }

    // QPX REST API URL (I censored my api key)
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg"

// fire request


function tweet(bady){


    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: speech,
        displayText: speech + 'lol',
        source: 'webhook-echo-sample'
    });

}
tweet();

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});