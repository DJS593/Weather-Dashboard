console.log ("hello");

// global variables



// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={your api key}

// var city = "novato";

// api call 

var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=novato&appid=9aa19330ef7b3b00f2721d639d19782d";
console.log(apiUrl);

fetch(apiUrl).then(function(response) {
  response.json().then(function(data) {
    console.log(data);
  })

});


// var getCityWeather = function(city) {
//   // to do: make the request dynamic based on city
//   var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=novato,ca&appid=9aa19330ef7b3b00f2721d639d19782d";

  
//   fetch(apiUrl).then(function(response) {
//     if (response.ok) {
//     response.json().then(function(data) {
//       //displayWeather(data, city);
//       console.log(data);
//     });
//     } else {
//       alert("Error: " + response.statusText);
//     }      
//   })
//   .catch(function(error) {
//     alert("Unable to connet to Open Weather");
//   });  
// };







