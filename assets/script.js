$(document).ready(function () {

    //add date and time, then update clock to run dynamically
    var currentDate = "";
    var currentTime = "";
    //var currentHour = moment().format('HH');

    var update = function() {
        currentTime = moment(new Date())
        currentDate.html(currentTime.format('dddd, MMMM Do YYYY, h:mm:ss a'));
    };

    $(document).ready(function() {
        currentDate = $('#currentDay')
        update();
        setInterval(update, 1000);
    })

})



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

    var cityName = $("<div>").text("City: " + response.name);
    var temp = $("<div>").text("Current Temperature: " + response.main.temp);
    var humidity = $("<div>").text("Humidity: " + response.main.humidity);
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed);

    $("#city-weather").empty();
    $("#city-weather").append(cityName, temp, humidity, wind);


  })

}
//event handler for user clicking search button
$("#search").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city").val().trim();

    var searchNum = $(this).attr("id");
    var city = $(this).siblings(".input").val();

    localStorage.setItem(searchNum, city);

    gatherWeather(cityInput);
});