$( document ).ready(function() {

  var sendRequest = function(){
    var inputfield1 = document.getElementsByClassName("origin")[0].value;
    var inputfield2 = document.getElementsByClassName("destination")[0].value;
    var inputfield3 = document.getElementsByClassName("date")[0].value;

    var FlightRequest = {
      "request": {
        "slice": [
        {
          "origin": inputfield1,
          "destination": inputfield2,
          "date": inputfield3
        }
        ],
        "passengers": {
          "adultCount": 1,
          "infantInLapCount": 0,
          "infantInSeatCount": 0,
          "childCount": 0,
          "seniorCount": 0
        },
        "solutions": 10,
        "saleCountry": "DE",
        "refundable": false
      }
    };


    $.ajax({
     type: "POST",
     url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBB9Q3zr7-Mp1uOYA3y8unPCOyPsjS7qBg", 
     contentType: 'application/json', 
     dataType: 'json',
     data: JSON.stringify(FlightRequest),
     success: function (data) {

      var myJSON = $.each(data.trips.tripOption, function(index, item) { 
        JSON.stringify(data.trips.tripOption[index].pricing[0].saleTotal);

        var price = data.trips.tripOption[index].pricing[0].saleTotal;
        var carrier = data.trips.tripOption[index].pricing[0].fare[0].carrier;
        console.log(price);

        $('#demo').append('<p>' + carrier + ': '  + price + ' </p>');

      });

    },
    error: function(){
     alert("Access to Google QPX Failed.");
   }
 });
  }

  $("#submit").click(function(){sendRequest();});


});