



function gatherWeather(city) {

// variables for api

var APIkey = 'eab4186c021254a40cb2caf858df2e69';
//var city = 'Nashville';
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey;




//ajax for calling weather information

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    console.log(response);

    var cityName = $("<div").text("City: " + response.name);
    var temp = $("div").text("Current Temperature: " + response.main.temp);
    var humidity = $("div").text("Humidity: " + response.main.humidity);
    var wind = $("div").text("Wind Speed: " + response.wind.speed);

    $("#city-weather").empty();
    $("#city-weather").append(cityName, temp, humidity, wind);


  })

};

//event handler for user clicking search button
$("#search").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city").val().trim();

    gatherWeather(cityInput);
});
