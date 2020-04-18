// global variables

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var priorCityEl = document.querySelector("#past-city");

//var citySearch = cityInputEl.textContent;
//var citySearch =("novato");
// console.log(citySearch);


// console.log(userFormEl);
// console.log(cityInputEl);
// console.log(weatherContainerEl);
// console.log(priorCity);




// api call 
// need to make the api call dynamic / novato is hard-coded right now

// var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=novato&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";


// var citySearch = ("novato");
// var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";



// use lon and lat from the other pull to grab UV
// var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=9aa19330ef7b3b00f2721d639d19782d";




// need to ask how to make the fetch call part of a function - not sure what I am doing wrong
// var getWeather = function() {

// create a long / lat var to call the UV

//var currentWeather = function () {

function myFunction() {

  // make the city dynamic in the API call
  var citySearch = document.getElementById("city").value;
  //var cityLongitude = data.coord.lon; 
  //var cityLatitude = data.coord.lat;
  //console.log(cityLongitude, cityLatitude);

  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

  fetch(apiUrlCurrent).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    
    // append current weather conditions

    // current city
    var currContainerEl = document.querySelector("#weather-container");
    var currCityContainerEl = document.querySelector("#city");
    
    var currCity = document.querySelector("#currCity");
    // currCity.setAttribute("city", data.name);
    //currCity.classList.add("current-city");
    currCity.textContent = data.name;
    currContainerEl.appendChild(currCity);
    //console.log("city", data.name);
    

    // current date
    var currDate = document.createElement("h4");
    currDate.classList.add("current-date");
    currDate.textContent = ("("+moment().format('l')+")");
    currContainerEl.appendChild(currDate);

    // current weather icon  // need to add URL for png file
    // http://openweathermap.org/img/wn/10d@2x.png  replace code "10d" with current code
    var currIcon = document.createElement("span");
    currIcon.classList.add("current-icon");
    currIcon.textContent = ("http://openweathermap.org/img/wn/"+data.weather.icon+"2x.png");
    currContainerEl.appendChild(currIcon);
    
    // current temp
    var currTemp = document.createElement("p");
    currTemp.classList.add("current-temp");
    roundCurrTemp = 
    currTemp.textContent = "Temperature: " + Math.round(data.main.temp) + " F";
    currContainerEl.appendChild(currTemp);
    //console.log("temp", data.main.temp);

    // current humidity
    var currHumidity = document.createElement("p");
    currHumidity.classList.add("current-humid");
    currHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    currContainerEl.appendChild(currHumidity);
    //console.log("humidity", data.main.humidity);

    // current wind speed
    var currWind = document.createElement("p");
    currWind.classList.add("current-wind");
    currWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    currContainerEl.appendChild(currWind);
    //console.log("wind", data.wind.speed);

      // current UV index
      // requires geocode
    var cityLongitude = data.coord.lon; 
    var cityLatitude = data.coord.lat;
    console.log(cityLongitude, cityLatitude);
    var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=9aa19330ef7b3b00f2721d639d19782d";
    fetch(apiUrlCurrent).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
    
      var currUv = document.createElement("p");
      currUv.classList.add("current-uv");
      currUv.textContent = "UV Index: this is a placeholder";
      currContainerEl.appendChild(currUv);
      console.log("placeholder")

      })})
    
   })
    
 });
    
};



//};


// var futureWeather = function () {}




// fetch(apiUrlForecast).then(function(response) {
//   response.json().then(function(data) {
//     // displayWeather(data);
//     console.log(data);
//     var forecastTemp = data.list[0].main.temp;
//     console.log(forecastTemp);
   
//     // var forecastHumidity = data.list.humidity;
//     // var forecastWind = data.list.wind;
//     // var forecastUv = data.list.uv;
//     // console.log(apiTemp);
//     // varTempEl = document.createElement("p");
//      // varTempEl.setAttribute(); // need to add here if I use //
//       //document.body.appendChild(varTempEl); // not setting to the body, but placeholder for now //
//     });
//   });
// // };
  


// local storage - need to keep the city names and data persistent

var cityName = [];

$("#user-form").on("click", "#btn-search", function(event) {
  event.preventDefault();
  var city = $("#city").val().trim();
  cityName.push(city);
  localStorage.setItem("city", JSON.stringify(cityName));
  console.log(cityName);
  
});

// get item from local storage

$("#past-city").val(JSON.parse(localStorage.getItem("city")));

// append the data to the page


// current time and city

  // time we can modify the below moment() and append
  // var rightNow = moment().format("dddd MMMM Do");
  // $("#currentDay").append(rightNow);
  // console.log(rightNow);

// Might use ths function for displaying the current conditions

 displayWeather = function(data, city) {

}

