 

(function () {
   /**
	 * Check document is ready.
     * Sometimes if checking with DOMContentLoaded, document can already be ready.
	 *
	 * @param function callback
	 * @return void
	 */
	 var ipluginsCommon = (function () {
	 	function isDocumentReady(callback) {
	 		if ((document.readyState === 'loaded') || (document.readyState === 'interactive') || (document.readyState === 'complete')) {
	 			callback();
	 		} else {
	 			document.addEventListener("DOMContentLoaded", function() {
	 				callback();
	 			});
	 		}
	 	}

	 	return {
	 		isDocumentReady: isDocumentReady
	 	}
	 })();







	 ipluginsCommon.isDocumentReady(function() {

	 	document.getElementById("submit").addEventListener("click", function () {
	 		console.log('click');

	 		var inputfield1 = document.getElementsByClassName("origin")[0].value;
	 		var inputfield2 = document.getElementsByClassName("destination")[0].value;
	 			//var inputfield3 = document.getElementsByClassName("date")[0].value;

	 			var defaultFlightRequest = {
	 				"request": {
	 					"slice": [
	 					{
	 						"origin": inputfield1,
	 						"destination": inputfield2,
	 						"date": "2018-05-11"
	 					}
	 					],
	 					"passengers": {
	 						"adultCount": 1,
	 						"infantInLapCount": 0,
	 						"infantInSeatCount": 0,
	 						"childCount": 0,
	 						"seniorCount": 0
	 					},
	 					"solutions": 20,
	 					"saleCountry": "DE",
	 					"refundable": false
	 				}
	 			};

						//Test Call like this
						checkFlightMinPrice(inputfield1, inputfield2, "2018-05-11", mySuccessFunction)



//or like this one:
/*
	checkFlightMinPrice("FRA", "LCY", "2016-04-26", function(price, currency){
		//Do Stuff here
		alert("The Currency is " + currency);
		alert("The minimal price is " + price);
	});
	*/

	function checkFlightMinPrice(origin, destination, date, callBack){
		var xhttp;
		if (window.XMLHttpRequest) {
			xhttp = new XMLHttpRequest();
		} else {
		// code for IE6, IE5
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open('POST', 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg', true);
	xhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	
	//modify default flight request to match our search
	var myFlightRequest = defaultFlightRequest;
	myFlightRequest.request.slice[0].origin = origin;
	myFlightRequest.request.slice[0].destination = destination;
	myFlightRequest.request.slice[0].date = date;
	
	xhttp.send(JSON.stringify(myFlightRequest));
	
	xhttp.onreadystatechange = function() {//Call a function when the state changes


		if(xhttp.readyState == 4){ //answer is ready

			if ( xhttp.status == 200) {
				var minPrice = Number.MAX_SAFE_INTEGER;
				var allTrips = JSON.parse(xhttp.response).trips;
				var numTripOptions = allTrips.tripOption.length;
				var currency = allTrips.tripOption[0].pricing[0].saleTotal.slice(0,3);
				console.log(xhttp.respons);

				for(var i = 0; i < numTripOptions; i++){
					console.log(xhttp.status);
					var numPricingOptions = allTrips.tripOption[i].pricing.length;

						//determine smallest price for this option
						for(var j = 0; j < numPricingOptions; j++){
							var priceEUR = Number.parseFloat(allTrips.tripOption[i].pricing[j].saleTotal.slice(3))
							var carrier = allTrips.tripOption[i].pricing[j].fare[0].carrier;
							if(priceEUR < minPrice) minPrice = priceEUR;
						}
					}
					callBack(minPrice, currency, carrier);
				} else {
					console.log('not Ready ' + xhttp.status)
				}
			}
		}
	}

	function mySuccessFunction(price, currency, carrier){

		console.log("Der minimale Preis ist: " + price + " " + currency + " mit dem Carrier: " + carrier);
	}

});
	 });


	})();