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

var city = "Chicago"
var APIkey = 'eab4186c021254a40cb2caf858df2e69';
//var city = 'Nashville';
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + APIkey;
var queryURL2 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + APIkey;

function gatherWeather() {


//ajax for calling weather information

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {


    console.log(response);

    var cityName = $("<h4>").text(response.name);
    var temp = $("<div>").text("Current Temperature: " + ((Math.floor(response.main.temp -273.15) * 1.8) + 32 + "\xB0F"));
    var high = $("<div>").text("Expected High Temp: " + ((Math.floor(response.main.temp_max -273.15) * 1.8) + 32 + "\xB0F"));
    var low = $("<div>").text("Expected Low Temp: " + ((Math.floor(response.main.temp_min -273.15) * 1.8) + 32 + "\xB0F"));
    var humidity = $("<div>").text("Humidity: " + response.main.humidity + " " + "%");
    var wind = $("<div>").text("Wind Speed: " + response.wind.speed + " " + "mph");

    $("#city-weather").empty();
    $("#city-weather").append(cityName, temp, high, low, humidity, wind);


  })

}

function fiveDay() {
 

    //ajax for calling 5 day forecast

    $.ajax({
        url: queryURL2,
        dataType: 'json',
        method: "GET",
        data: {
            q: city,
            units: 'imperial',
            cnt: "5"
        },


      success: function(data) {
        console.log('Data:', data)
        var forecast = "";
        

        forecast += "<h3>" + data.city.name + "</h3>";
        $.each(data.list, function(dt_txt, val) {
            var tempH = Math.floor(val.main.temp_max);
            var tempL = Math.floor(val.main.temp_min);
            forecast += "<p>";
            forecast += "<b>" + val.dt_txt + "</b>: ";
            forecast += "High: " + tempH + "&degF";
            forecast += " " + "Low: " + tempL + "&degF";
            forecast += "<span> | " + val.weather[0].description + "</span>";
            forecast += "<img src='https://openweathermap.org/img/w/" + val.weather[0].icon + ".png'>";
            forecast += "</p>";
        });

        $("#fiveDay").html(forecast);

    }
    
    
})
}




//event handler for user clicking search button
$("#search").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#city").val().trim();
    var forecast = $("#city").val().trim();

    var searchNum = $(this).attr("id");
    var city = $(this).siblings(".input").val();

    localStorage.setItem(searchNum, city);

    gatherWeather(cityInput);
    fiveDay(forecast)
});