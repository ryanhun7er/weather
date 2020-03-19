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

//variables for page

var city = document.getElementById("city").value;
var APIkey = 'eab4186c021254a40cb2caf858df2e69';
var APIkeyG = 'AIzaSyCmplXCB6KR_-vv7v-oTy2LQNMg_veu8ic'


//function to get current weather
function getWeather(city) {

    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey;

//ajax for calling weather information

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    console.log(response);

    var cityName = $("<h4>").text(response.name);
    var iconPic = "<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>";
    var temp = $("<div>").text("Current Temperature: " + ((Math.floor(response.main.temp -273.15) * 1.8) + 32 + "\xB0F"));
    var high = $("<div>").text("Expected High Temp: " + ((Math.floor(response.main.temp_max -273.15) * 1.8) + 32 + "\xB0F"));
    var low = $("<div>").text("Expected Low Temp: " + ((Math.floor(response.main.temp_min -273.15) * 1.8) + 32 + "\xB0F"));
    var humidity = $("<div>").text("Humidity: " + response.main.humidity + " " + "%");
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed + " " + "mph");

    $("#city-weather").empty();
    $("#city-weather").append(cityName, iconPic, temp, high, low, humidity, wind);


  })

}

//function to get 5 day weather
function fiveDay(city) {

    var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;
 

    //ajax for calling 5 day forecast

    $.ajax({
        url: queryURL2,
        dataType: 'json',
        method: "GET",
        data: {
            q: city,
            units: 'imperial',
            cnt: "50"
        },


        success: function (data) {
            console.log('Data:', data)
            var forecast = "";


            forecast += "<h4>" + data.city.name + "</h4>";
            for (var i = 0; i < data.list.length; i++) {

                if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                    var tempH = Math.floor(data.list[i].main.temp_max);
                    var tempL = Math.floor(data.list[i].main.temp_min);
                    var dateC = data.list[i].dt_txt
                    var dateR = dateC.split('15:00:00').join("");
                    forecast += "<p>";
                    forecast += "<b>" + dateR + "</b>: ";
                    forecast += "</p>";
                    forecast += "High: " + tempH + "&degF";
                    forecast += " " + "Low: " + tempL + "&degF";
                    forecast += "<span> | " + data.list[i].weather[0].description + "</span>";
                    forecast += "<img src='https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'>";
                    forecast += "</p>";
                }
            }

            $("#fiveDay").html(forecast);

        }
    
    
})
}


//event handler for user clicking search button

$("#search").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city").val().trim();
    var forecast = $("#city").val().trim();
    var searchArray = JSON.parse(localStorage.getItem('cityInput')) || [];

    searchArray.push(cityInput);

    localStorage.setItem('cityInput', JSON.stringify(searchArray))

    populatelist();
    getWeather(cityInput);
    fiveDay(forecast)
});

//append cities to search history
function populatelist() {
    var searchArray = JSON.parse(localStorage.getItem("cityInput")) || [];
    $("#search-history").empty();
    searchArray.forEach(function(list) {
        $("#search-history").prepend("<li>" + list + "</li>")
    })
};

populatelist();

//load page with last query

function pageLoad() {
    var searchArray = JSON.parse(localStorage.getItem("cityInput")) || [];
    var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchArray[searchArray.length-1] + '&appid=' + APIkey;
    var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchArray[searchArray.length-1] + '&appid=' + APIkey;
 
//ajax for current weather to reload
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

    var cityName = $("<h4>").text(response.name);
    var iconPic = "<img src='https://openweathermap.org/img/w/" + response.weather[0].icon + ".png'>";
    var temp = $("<div>").text("Current Temperature: " + ((Math.floor(response.main.temp -273.15) * 1.8) + 32 + "\xB0F"));
    var high = $("<div>").text("Expected High Temp: " + ((Math.floor(response.main.temp_max -273.15) * 1.8) + 32 + "\xB0F"));
    var low = $("<div>").text("Expected Low Temp: " + ((Math.floor(response.main.temp_min -273.15) * 1.8) + 32 + "\xB0F"));
    var humidity = $("<div>").text("Humidity: " + response.main.humidity + " " + "%");
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed + " " + "mph");

    $("#city-weather").empty();
    $("#city-weather").append(cityName, iconPic, temp, high, low, humidity, wind);
})

//ajax for 5 day weather to reload
$.ajax({
    url: queryURL2,
    dataType: 'json',
    method: "GET",
    data: {
        q: searchArray[searchArray.length-1],
        units: 'imperial',
        cnt: "50"
    },


    success: function (data) {
        console.log('Data:', data)
        var forecast = "";


        forecast += "<h3>" + data.city.name + "</h3>";
        for (var i = 0; i < data.list.length; i++) {

            if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var tempH = Math.floor(data.list[i].main.temp_max);
                var tempL = Math.floor(data.list[i].main.temp_min);
                var dateC = data.list[i].dt_txt
                var dateR = dateC.split('15:00:00').join("");
                forecast += "<p>";
                forecast += "<b>" + dateR + "</b>: ";
                forecast += "</p>";
                forecast += "High: " + tempH + "&degF";
                forecast += " " + "Low: " + tempL + "&degF";
                forecast += "<span> | " + data.list[i].weather[0].description + "</span>";
                forecast += "<img src='https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'>";
                forecast += "</p>";
            }
        }

        $("#fiveDay").html(forecast);
    }

})
}


pageLoad();







// function initMap() {

//     var queryURL = 'https://maps.googleapis.com/maps/api/js?key=' + APIkeyG + '&callback=initMap';

//     $.ajax({
//         url: queryURL,
//         method: "GET"
//       }).then(function(response) {

//         var cityLoc = response.coord
// }
