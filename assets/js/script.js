var userCity = document.querySelector("#city");
var containerEl = document.querySelector("#container");
var localDataArray = localStorage.getItem("localDataArray");
var arrOfData = JSON.parse(localDataArray);
var API_KEY = "4be23710c7753951da2356832f750589";

$(".searchButton").click(function (event) {
  event.preventDefault();
  var cityName = userCity.value.trim();
  //console.log(cityValue);

  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      cityName +
      "&limit=1&appid=" +
      API_KEY
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (reponse) {
      console.log(reponse[0]);
      var lat = reponse[0].lat;
      var lon = reponse[0].lon;
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly&appid=" +
          API_KEY
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (weatherResponse) {
      console.log(weatherResponse);
    })
    .catch(function (error) {
      alert("Unable to connect to openweathermap");
    });
});

// function displayCityWeather(cityWeather) {
//   console.log(cityWeather);
//   console.log(`City: ${cityWeather.city.name}`);
// }

//$("#repos-container .city").val(localStorage.getItem("city"));
