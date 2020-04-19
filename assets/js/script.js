// global variables

var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#weather-container");
var priorCityEl = document.querySelector("#past-city");
var buttonEl = document.querySelector("#btn-search");





// api call 
// need to make the api call dynamic / novato is hard-coded right now

// var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=novato&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";






// use lon and lat from the other pull to grab UV
// var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=9aa19330ef7b3b00f2721d639d19782d";





var currentWeather = function(event) {
// function myFunction() {

  // make the city dynamic in the API call
  var citySearch = document.getElementById("city").value;
  
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
    var currDate = document.querySelector("#currDate");
    currDate.textContent = ("("+moment().format('l')+")");
    currContainerEl.appendChild(currDate);

    // current weather icon  // need to add URL for png file
    // http://openweathermap.org/img/wn/10d@2x.png  replace code "10d" with current code
    var currIcon = document.querySelector("#currIcon");
    urlCurrIcon = ("http://openweathermap.org/img/wn/"+data.weather.icon+"2x.png");
    currIcon.setAttribute("src", urlCurrIcon);
    //currIcon.textContent = ("http://openweathermap.org/img/wn/"+data.weather.icon+"2x.png");
    currContainerEl.appendChild(currIcon);
    
    // current temp
    var currTemp = document.querySelector("#currTemp");
    currTemp.textContent = "Temperature: " + Math.round(data.main.temp) + " F";
    currContainerEl.appendChild(currTemp);

    // current humidity
    var currHumidity = document.querySelector("#currHumidity");
    currHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    currContainerEl.appendChild(currHumidity);

    // current wind speed
    var currWind = document.querySelector("#currWind");
    currWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    currContainerEl.appendChild(currWind);

    
    // current UV index
    // requires geocode
 
    
    var cityLongitude = data.coord.lon; 
    var cityLatitude = data.coord.lat;
    console.log(cityLongitude, cityLatitude);
    var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=9aa19330ef7b3b00f2721d639d19782d";
    fetch(apiUrlCurrent).then(function(response) {
      response.json().then(function(data) {
        //console.log(data);
    
      var currUv = document.querySelector("#currUv");
      //currUv.classList.add("current-uv");
      currUv.textContent = "UV Index: " + data.value;
      currContainerEl.appendChild(currUv);
      console.log("currUv")

      })})
    
    })
    
  });
     
 };
    
 
    






var forecastWeather = function (event) {

var citySearch = document.getElementById("city").value;  
var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

fetch(apiUrlForecast).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
    //var forecastTemp = data.list[0].main.temp;
    // console.log(forecastTemp);
   
    // var forecastHumidity = data.list.humidity;
    // var forecastWind = data.list.wind;
    // var forecastUv = data.list.uv;
    // console.log(apiTemp);
    // varTempEl = document.createElement("p");
     // varTempEl.setAttribute(); // need to add here if I use //
      //document.body.appendChild(varTempEl); // not setting to the body, but placeholder for now //
    });
  });

}








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




// addEventListener for the button click to begin functions

buttonEl.addEventListener("click", currentWeather);
buttonEl.addEventListener("click", forecastWeather);

