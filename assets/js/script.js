var userCity = document.querySelector("#city");
var containerEl = document.querySelector("#container");
var localDataArray = localStorage.getItem("localDataArray");
var arrOfData = JSON.parse(localDataArray);
var API_KEY = "4be23710c7753951da2356832f750589";
var weatherEl = document.querySelector("#weather");
var cityText = document.querySelector('#cityText');
var weatherText = document.querySelector('#weatherText');


$(".searchButton").click(function (event) {
  event.preventDefault();
  var cityName = userCity.value.trim();
  weatherEl.style.display = "block";
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
    .then(function (response) {
      console.log(response[0]);
      var lat = response[0].lat;
      var lon = response[0].lon;
      var cityResult = response[0].name;
      cityText.textContent = cityResult;
      return fetch(
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly&appid=" +
          API_KEY + "&units=metric"
      );
    })
    .then(function (res) {
      return res.json();
    })
    .then(function (weatherResponse) {
      console.log(weatherResponse);
      var day = weatherResponse.daily[0].dt;
      var icon = weatherResponse.current.weather[0].icon;
      var temperature = weatherResponse.current.temp;
      var humidity = weatherResponse.current.humidity;
      var windSpeed = weatherResponse.current.wind_speed;
      var uvi = weatherResponse.current.uvi;
      var txtEl = document.createElement('txt')
      txtEl.textContent = ("(" + day + ")");
      cityText.appendChild(txtEl)
      weatherText.textContent = [("(" + day + ")") ,("Temperature: " + temperature + "°C") , ("Humidity: " + humidity + " %"), ("Wind Speed: " + windSpeed + " MPH"), ("UV Index: " + uvi)];
      var imgEl = document.createElement('img')
      imgEl.setAttribute('src', 'http://openweathermap.org/img/wn/' + icon + '.png');
      cityText.appendChild(imgEl)
    })
    .catch(function (error) {
      alert("Unable to connect to openweathermap");
    });
});