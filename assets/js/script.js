// global variables

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");

console.log(userFormEl);
console.log(cityInputEl);
console.log(weatherContainerEl);

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

// var city = "novato";

// api call 
// need to make the api call dynamic / novato is hard-coded right now

var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=novato&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=novato&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

// need to ask how to make the fetch call part of a function - not sure what I am doing wrong
// var getWeather = function() {

fetch(apiUrlCurrent).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  })
});


    fetch(apiUrlForecast).then(function(response) {
      response.json().then(function(data) {
      displayWeather(data);
      console.log(data);
      var apiTemp = data.list.weather;
      console.log(apiTemp);
      varTempEl = document.createElement("p");
     // varTempEl.setAttribute(); // need to add here if I use //
      //document.body.appendChild(varTempEl); // not setting to the body, but placeholder for now //
    });
  });
// };
  


// local storage - need to keep the city names and data persistent

var cityName = [];

$("#user-form").on("click", "#btn-search", function(event) {
  event.preventDefault();
  var city = $("#city").val().trim();
  cityName.push(city);
  localStorage.setItem("city", JSON.stringify(cityName));
  console.log(cityName);
});



// append the data to the page


// current time and city

  // time we can modify the below moment() and append
  // var rightNow = moment().format("dddd MMMM Do");
  // $("#currentDay").append(rightNow);
  // console.log(rightNow);

// Might use ths function for displaying the current conditions

 displayWeather = function(data, city) {

}

