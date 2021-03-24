var formEl = document.querySelector('.our-form')
var firstNameEl = document.querySelector('#first-name')
var lastNameEl = document.querySelector('#last-name')
var listOfSubsEl = document.querySelector('#repos-container')
var localDataArray = localStorage.getItem('localDataArray')
var arrOfData = JSON.parse(localDataArray)

formEl.addEventListener('submit', function (event) {
    event.preventDefault()
    var firstNameValue = firstNameEl.value.trim()
    var lastNameValue = lastNameEl.value.trim()
    var data = {
        firstNameValue, lastNameValue
    }
    arrOfData.push(data)
    var arrOfDataJSONStr = JSON.stringify(arrOfData)
    localStorage.setItem('localDataArray', arrOfDataJSONStr)
    clearForm();
});

function clearForm () {
    firstNameEl.value = ''
    lastNameEl.value = ''
}





////////////////////////////////




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
      //displayWeather(cityResult);
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
      displayWeather(day, icon, temperature, humidity);
      //console.log(icon);
    })
    .catch(function (error) {
      alert("Unable to connect to openweathermap");
    });
});

function displayWeather(cityResult, day, icon, temperature, humidity) {
    cityText.textContent = cityResult;
    var imgEl = document.createElement('img')
    console.log(icon, humidity)
    //imgEl.setAttribute('src', 'http://openweathermap.org/img/wn/'+icon+'.png');
    weatherEl.appendChild(imgEl)
    weatherText.textContent = [("(" + day + ")") ,("Temperature: " + temperature + "°C") , ("Humidity: " + humidity + " %")];
}