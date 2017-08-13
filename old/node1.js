console.log('Hello World');

var API = require('qpx-express');

var apiKey = 'AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg';
var qpx = new API(apiKey);


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
            "date": departureDate // YYYY-MM-DD 
        }
        ],
        "solutions": 5
    }
};

qpx.getInfo(body, function(error, data){
	    //console.log('Heyy!', data);

  for(var i = 0; i < data.trips.tripOption.length; i++) {
       //JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

        var price = data.trips.tripOption[i].pricing[0].saleTotal;
        var carrier = data.trips.tripOption[i].pricing[0].fare[0].carrier;
        console.log(carrier + ": " + price);
  }
});