 // create http request client to consume the QPX API
 var request = require("request")

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
request({
    url: url,
    method: "POST",
    json: requestData
}, function (error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body)
    }
    else {
        console.log("error: " + error)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusText)
    }
})
