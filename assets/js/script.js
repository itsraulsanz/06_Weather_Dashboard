var userCity = document.querySelector("#city");
var containerEl = document.querySelector("#container");
var localDataArray = localStorage.getItem("localDataArray");
var arrOfData = JSON.parse(localDataArray);
var API_KEY = "4be23710c7753951da2356832f750589";
var weatherEl = document.querySelector("#weather");
var cityText = document.querySelector("#cityText");
var weatherText = document.querySelector("#weatherText");

$(".searchButton").click(function (event) {
  event.preventDefault();
  var cityName = userCity.value.trim();
  weatherEl.style.display = "block";
  var cityResultName = "";

  function getOpenWeatherData() {
    return fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        cityName +
        "&limit=1&appid=" +
        API_KEY
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (response) {        
        var lat = response[0].lat;
        var lon = response[0].lon;
        cityResultName = response[0].name;        
        
        return fetch(
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&exclude=minutely,hourly&appid=" +
            API_KEY +
            "&units=metric"
        );
      })
      .then(function (res) {
        return res.json();
      });
  }

  function printCityWeatherData(weatherResponse) {
    console.log(weatherResponse);
    console.log({cityResultName});
    cityText.textContent = cityResultName;
    var date = new Date(weatherResponse.daily[0].dt * 1000).toLocaleDateString();
    var icon = weatherResponse.current.weather[0].icon;
    var temperature = weatherResponse.current.temp;
    var humidity = weatherResponse.current.humidity;
    var windSpeed = weatherResponse.current.wind_speed;
    var uvi = weatherResponse.current.uvi;
    var txtEl = document.createElement("txt");
    txtEl.textContent = "(" + date + ")";
    cityText.appendChild(txtEl);
    weatherText.textContent = [
      "Temperature: " + temperature + "°C",
      "Humidity: " + humidity + " %",
      "Wind Speed: " + windSpeed + " MPH",
      "UV Index: " + uvi,
    ];
    cityText.appendChild(createIcon(icon));

  }

  function createIcon(iconName) {
    var imgEl = document.createElement("img");
    imgEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + iconName + ".png"
    );
    return imgEl
    ;
  }


  getOpenWeatherData()
    .then(printCityWeatherData)
    // .catch(function (error) {
    //   console.log(error);
    //   alert("Unable to connect to openweathermap");
    // });
});