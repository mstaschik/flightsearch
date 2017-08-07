'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());

restService.post('/echo', function(req, res) {
    var API = require('qpx-express');
 
var apiKey = 'AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg';
var qpx = new API(apiKey);
 
var body = {
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
<<<<<<< HEAD
    }

    // QPX REST API URL (I censored my api key)
    url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg"

// fire request
request({
    url: url,
    method: "POST",
    json: requestData
}, function (error, response, bodyl) {
    if (!error && response.statusCode === 200) {
        console.log(bodyl)

        var speech = req.bodyl.result && req.bodyl.result.parameters && req.bodyl.result.parameters.echoText ? req.bodyl.result.parameters.echoText : "Seems like some problem. Speak again."
        return res.json({
            speech: "lol",
            displayText: "lol",
            source: 'webhook-echo-sample'
        });
    }
    else {
        console.log("error: " + error)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusText)
    }
})

=======
    };
 
qpx.getInfo(body, function(error, data){
    console.log('Heyy!', data);
});
>>>>>>> Marco


    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: body,
        displayText: body,
        source: 'webhook-echo-sample'
    });
});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});