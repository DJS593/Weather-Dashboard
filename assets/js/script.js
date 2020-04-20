// global variables

var userFormEl = document.querySelector("#user-form");
var priorCityEl = document.querySelector("#city-list");
var buttonEl = document.querySelector("#btn-search");
var currContainerEl = document.querySelector("#weather-container");
var currCityContainerEl = document.querySelector("#city-input");
var currUvEl = document.querySelector("#currUv");
var forecastContainerElOne = document.querySelector("#forecastDay1");
var forecastContainerElTwo = document.querySelector("#forecastDay2");
var forecastContainerElThree = document.querySelector("#forecastDay3");
var forecastContainerElFour = document.querySelector("#forecastDay4");
var forecastContainerElFive = document.querySelector("#forecastDay5");


// current weather conditions

var currentWeather = function(event) {
  event.preventDefault();

  // city search is dynamic
  var citySearch = document.getElementById("city-input").value;
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

    // current weather icon  
    var currIcon = document.querySelector("#currIcon");
    urlCurrIcon = ("http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png");
    console.log(urlCurrIcon);
    currIcon.setAttribute("src", urlCurrIcon);
    //currIcon.textContent = ("http://openweathermap.org/img/wn/"+data.weather.icon+"2x.png");
    currContainerEl.appendChild(currIcon);
    
    // current temp
    var currTemp = document.querySelector("#currTemp");
    currTemp.textContent = "Temperature: " + Math.round(data.main.temp) + " °F";
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
    
    var apiUrlUv = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=9aa19330ef7b3b00f2721d639d19782d";
    //var apiUrlUv = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&appid=9aa19330ef7b3b00f2721d639d19782d";
    
    
    return fetch(apiUrlUv) // this is data.apiUrlUv (changed it so the function will work)
   
  .then(function(response) { 
    return response.json() 
  })
  .then(function(data) {
    console.log(data);
    
    // current UV index (requires geocode)
    var currUv = document.querySelector("#currUv");
    currUv.textContent = "UV Index: " + data.value;
    
    // adding color code for UV index; 6.0+ = red (high), 3.0 to 6.0 = yellow (moderate), below 3.0 (low)
    if (data.value > 6.0) {
      currUv.classList = ("bg-danger");
    }
    else if (data.value < 3.0) {
      currUv.classList = ("bg-success")     
    }   
     else {
        currUv.classList = ("bg-warning")     
    }
    
    currContainerEl.appendChild(currUv);
    
  }) 
})
};
  
// 5 day weather forecast

var forecastWeather = function (event) {

  var citySearch = document.getElementById("city-input").value;
  var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";

  fetch(apiUrlCurrent).then(function(response) {
    return response.json()
  })
  .then(function(data) {

  var cityLongitude = data.coord.lon; 
  var cityLatitude = data.coord.lat;
  var apiUrlForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLatitude + "&lon=" + cityLongitude + "&units=imperial&appid=9aa19330ef7b3b00f2721d639d19782d";
  console.log(data);

  return fetch(apiUrlForecast)
    .then(function(response) {
    return response.json()
    })
    .then(function(data) {
    console.log(data); 

    // day one forecast
    var foreDate1 = document.querySelector("#day1Date");
    foreDate1.textContent = moment().add(1, "days").format('l');
    forecastContainerElOne.appendChild(foreDate1);

    var foreIcon1 = document.querySelector("#day1Icon");
    urlForeIcon1 = ("http://openweathermap.org/img/wn/"+data.daily[1].weather[0].icon+"@2x.png")
    foreIcon1.setAttribute("src", urlForeIcon1);
    forecastContainerElOne.appendChild(foreIcon1);
    
    var foreTemp1 = document.querySelector("#day1Temp");
    foreTemp1.textContent = ("Temp: " + Math.round(data.daily[1].temp.max) + " °F");
    forecastContainerElOne.appendChild(foreTemp1);

    var foreHumid1 = document.querySelector("#day1Humid");
    foreHumid1.textContent = ("Humidity: " + data.daily[1].humidity + "%");
    forecastContainerElOne.appendChild(foreHumid1);
    
    // day two forecast
    var foreDate2 = document.querySelector("#day2Date");
    foreDate2.textContent = moment().add(2, "days").format('l');
    forecastContainerElTwo.appendChild(foreDate2);

    var foreIcon2 = document.querySelector("#day2Icon");
    urlForeIcon2 = ("http://openweathermap.org/img/wn/"+data.daily[2].weather[0].icon+"@2x.png")
    foreIcon2.setAttribute("src", urlForeIcon2);
    forecastContainerElTwo.appendChild(foreIcon2);
    
    var foreTemp2 = document.querySelector("#day2Temp");
    foreTemp2.textContent = ("Temp: " + Math.round(data.daily[2].temp.max) + " °F");
    forecastContainerElTwo.appendChild(foreTemp2);

    var foreHumid2 = document.querySelector("#day2Humid");
    foreHumid2.textContent = ("Humidity: " + data.daily[2].humidity + "%");
    forecastContainerElTwo.appendChild(foreHumid2);
    
    // day three forecast
    var foreDate3 = document.querySelector("#day3Date");
    foreDate3.textContent = moment().add(3, "days").format('l');
    forecastContainerElThree.appendChild(foreDate3);

    var foreIcon3 = document.querySelector("#day3Icon");
    urlForeIcon3 = ("http://openweathermap.org/img/wn/"+data.daily[3].weather[0].icon+"@2x.png")
    foreIcon3.setAttribute("src", urlForeIcon3);
    forecastContainerElThree.appendChild(foreIcon3);
    
    var foreTemp3 = document.querySelector("#day3Temp");
    foreTemp3.textContent = ("Temp: " + Math.round(data.daily[3].temp.max) + " °F");
    forecastContainerElThree.appendChild(foreTemp3);

    var foreHumid3 = document.querySelector("#day3Humid");
    foreHumid3.textContent = ("Humidity: " + data.daily[3].humidity + "%");
    forecastContainerElThree.appendChild(foreHumid3);

    // day four forecast
    var foreDate4 = document.querySelector("#day4Date");
    foreDate4.textContent = moment().add(4, "days").format('l');
    forecastContainerElFour.appendChild(foreDate4);

    var foreIcon4 = document.querySelector("#day4Icon");
    urlForeIcon4 = ("http://openweathermap.org/img/wn/"+data.daily[4].weather[0].icon+"@2x.png")
    foreIcon4.setAttribute("src", urlForeIcon4);
    forecastContainerElFour.appendChild(foreIcon4);

    var foreTemp4 = document.querySelector("#day4Temp");
    foreTemp4.textContent = ("Temp: " + Math.round(data.daily[4].temp.max) + " °F");
    forecastContainerElFour.appendChild(foreTemp4);

    var foreHumid4 = document.querySelector("#day4Humid");
    foreHumid4.textContent = ("Humidity: " + data.daily[4].humidity + "%");
    forecastContainerElFour.appendChild(foreHumid4);

    // day five forecast
    var foreDate5 = document.querySelector("#day5Date");
    foreDate5.textContent = moment().add(5, "days").format('l');
    forecastContainerElFive.appendChild(foreDate5);

    var foreIcon5 = document.querySelector("#day5Icon");
    urlForeIcon5 = ("http://openweathermap.org/img/wn/"+data.daily[5].weather[0].icon+"@2x.png")
    foreIcon5.setAttribute("src", urlForeIcon5);
    forecastContainerElFive.appendChild(foreIcon5);

    var foreTemp5 = document.querySelector("#day5Temp");
    foreTemp5.textContent = ("Temp: " + Math.round(data.daily[5].temp.max) + " °F");
    forecastContainerElFive.appendChild(foreTemp5);

    var foreHumid5 = document.querySelector("#day5Humid");
    foreHumid5.textContent = ("Humidity: " + data.daily[5].humidity + "%");
    forecastContainerElFive.appendChild(foreHumid5);

    });
  });
};

// store city search in localStorage

var cityName = JSON.parse(localStorage.getItem("city-input"))||[];

$("#user-form").on("click", "#btn-search", function(event) {
  event.preventDefault();
  var city = $("#city-input").val().trim();
  cityName.push(city);
  localStorage.setItem("cityName", JSON.stringify(cityName));
  console.log(cityName);
  
  $("#history").val(JSON.parse(localStorage.getItem("cityName")));
  console.log(cityName);

  // test to see if I can pull index [0] from the array 
  //$("#history").html(cityName[0]);
  
  // for loop to run through the array and append to the page
  var i;
  for (i = 0; i < cityName.length; i++) {
  $("#history").html(cityName[i]);
 }


});


// addEventListener for the button click to begin functions

buttonEl.addEventListener("click", currentWeather);
buttonEl.addEventListener("click", forecastWeather);