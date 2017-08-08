'use strict';

const express = require('express');
const bodyParser = require('body-parser');



const restService = express();

restService.use(bodyParser.urlencoded({
    extended: true
}));

restService.use(bodyParser.json());





restService.post('/echo', function(req, res) {




function tweet(bady){


    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Seems like some problem. Speak again."
    return res.json({
        speech: bady,
        displayText: speech + 'lol',
        source: 'webhook-echo-sample'
    });

}
tweet();

});

restService.listen((process.env.PORT || 8000), function() {
    console.log("Server up and listening");
});