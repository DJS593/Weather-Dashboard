// global variables

var userFormEl = document.querySelector("#user-form");
var priorCityEl = document.querySelector("#past-city");
var buttonEl = document.querySelector("#btn-search");
var currContainerEl = document.querySelector("#weather-container");
var currCityContainerEl = document.querySelector("#city");
var forecastContainerElOne = document.querySelector("#forecastDay1");
var forecastContainerElTwo = document.querySelector("#forecastDay2");
var forecastContainerElThree = document.querySelector("#forecastDay3");
var forecastContainerElFour = document.querySelector("#forecastDay4");
var forecastContainerElFive = document.querySelector("#forecastDay5");

// var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=novato&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

// use lon and lat from the other pull to grab UV
// var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid=9aa19330ef7b3b00f2721d639d19782d";


var currentWeather = function(event) {

  // city parameter needs to be dynamic
  var citySearch = document.getElementById("city").value;
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

  fetch(apiUrlCurrent).then(function(response) {
    return response.json()
  })
  .then(function(data) {
    
    // append current weather conditions

    // current city
    var currCity = document.querySelector("#currCity");
    currCity.textContent = data.name;
    currContainerEl.appendChild(currCity);
    
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
  
    var cityLongitude = data.coord.lon; 
    var cityLatitude = data.coord.lat;
    var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=9aa19330ef7b3b00f2721d639d19782d";
    return fetch(apiUrlUv) // this is data.apiUrlUv (changed it so the function will work)
  }) 
  .then(function(response) { 
    return response.json() 
  })
  .then(function(data) {
    
    // current UV index (requires geocode)
    var currUv = document.querySelector("#currUv");
    currUv.textContent = "UV Index: " + data.value;
    currContainerEl.appendChild(currUv);
  }) 
 };
  

var forecastWeather = function (event) {

//var citySearch = document.getElementById("city").value;  
//var apiUrlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d"; 

//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}
var lat = ("38.1074")
var lon = ("-122.5697")
var apiUrlForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

fetch(apiUrlForecast).then(function(response) {
  response.json()
  .then(function(data) {
    console.log(data);

    // day one forecast
    var foreDate1 = document.querySelector("#day1Date");
    foreDate1.textContent = moment().add(1, "days").format('l');
    forecastContainerElOne.appendChild(foreDate1);

    var foreIcon1 = document.querySelector("#day1Icon");
    foreIcon1.textContent = data.daily[1].weather[0].icon;
    forecastContainerElOne.appendChild(foreIcon1);
    
    var foreTemp1 = document.querySelector("#day1Temp");
    foreTemp1.textContent = ("Temp: " + data.daily[1].temp.max + " F");
    forecastContainerElOne.appendChild(foreTemp1);

    var foreHumid1 = document.querySelector("#day1Humid");
    foreHumid1.textContent = ("Humidity: " + data.daily[1].humidity + "%");
    forecastContainerElOne.appendChild(foreHumid1);
    
    // day two forecast
    var foreDate2 = document.querySelector("#day2Date");
    foreDate2.textContent = moment().add(2, "days").format('l');
    forecastContainerElTwo.appendChild(foreDate2);

    var foreIcon2 = document.querySelector("#day2Icon");
    foreIcon2.textContent = data.daily[2].weather[0].icon;
    forecastContainerElTwo.appendChild(foreIcon2);

    var foreTemp2 = document.querySelector("#day2Temp");
    foreTemp2.textContent = ("Temp: " + data.daily[2].temp.max + " F");
    forecastContainerElTwo.appendChild(foreTemp2);

    var foreHumid2 = document.querySelector("#day2Humid");
    foreHumid2.textContent = ("Humidity: " + data.daily[2].humidity + "%");
    forecastContainerElTwo.appendChild(foreHumid2);
    
    // day three forecast
    var foreDate3 = document.querySelector("#day3Date");
    foreDate3.textContent = moment().add(3, "days").format('l');
    forecastContainerElThree.appendChild(foreDate3);

    var foreIcon3 = document.querySelector("#day3Icon");
    foreIcon3.textContent = data.daily[3].weather[0].icon;
    forecastContainerElThree.appendChild(foreIcon3);

    var foreTemp3 = document.querySelector("#day3Temp");
    foreTemp3.textContent = ("Temp: " + data.daily[3].temp.max + " F");
    forecastContainerElThree.appendChild(foreTemp3);

    var foreHumid3 = document.querySelector("#day3Humid");
    foreHumid3.textContent = ("Humidity: " + data.daily[3].humidity + "%");
    forecastContainerElThree.appendChild(foreHumid3);

    // day four forecast
    var foreDate4 = document.querySelector("#day4Date");
    foreDate4.textContent = moment().add(4, "days").format('l');
    forecastContainerElFour.appendChild(foreDate4);

    var foreIcon4 = document.querySelector("#day4Icon");
    foreIcon4.textContent = data.daily[4].weather[0].icon;
    forecastContainerElFour.appendChild(foreIcon4);

    var foreTemp4 = document.querySelector("#day4Temp");
    foreTemp4.textContent = ("Temp: " + data.daily[4].temp.max + " F");
    forecastContainerElFour.appendChild(foreTemp4);

    var foreHumid4 = document.querySelector("#day4Humid");
    foreHumid4.textContent = ("Humidity: " + data.daily[4].humidity + "%");
    forecastContainerElFour.appendChild(foreHumid4);

    // day five forecast
    var foreDate5 = document.querySelector("#day5Date");
    foreDate5.textContent = moment().add(5, "days").format('l');
    forecastContainerElFive.appendChild(foreDate5);

    var foreIcon5 = document.querySelector("#day5Icon");
    foreIcon5.textContent = data.daily[5].weather[0].icon;
    forecastContainerElFive.appendChild(foreIcon5);

    var foreTemp5 = document.querySelector("#day5Temp");
    foreTemp5.textContent = ("Temp: " + data.daily[5].temp.max + " F");
    forecastContainerElFive.appendChild(foreTemp5);

    var foreHumid5 = document.querySelector("#day5Humid");
    foreHumid5.textContent = ("Humidity: " + data.daily[5].humidity + "%");
    forecastContainerElFive.appendChild(foreHumid5);

    });
  });

}

//EXAMPLE TO SHARE WITH TA TOMORROW
// fetch(url)
// .then(function(response) { 
//   return response.json()
// })
// .then(function(data) {   
//   // do stuff with `data`, call second `fetch`
//   return fetch(data.anotherUrl)
// })
// .then(function(response) { 
//   return response.json(); 
// })
// .then(function(data) {
//   // do stuff with `data`
// })
// .catch(function(error) { 
//   console.log('Requestfailed', error) 
// });






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

