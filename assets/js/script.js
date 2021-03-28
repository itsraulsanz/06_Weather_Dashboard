var formEl = document.querySelector(".city-form");
var userCity = document.querySelector("#city");
var cityListEl = document.querySelector(".cityList");
var containerEl = document.querySelector(".containerWeather");
var currentWeatherEl = document.querySelector(".currentWeather");
var fiveDaysWeatherEl = document.querySelector(".fiveDaysWeather");
var currentWeatherTitle = document.querySelector(".currentWeatherTitle");
var currentWeatherContent = document.querySelector(".currentWeatherContent");

var API_KEY = "4be23710c7753951da2356832f750589";

function search(event) {
  var cityName;
  console.log(event)
  event.preventDefault();
  if(event.type === "load"){
    console.log("load", event.type)
    var cityList = JSON.parse(localStorage.getItem("cityList")) || [];
    if(cityList.length === 0){
      return;
    }
    console.log(cityList[cityList.length - 1].city)
    cityName = cityList[cityList.length - 1].city;
  } else {

    var cityName = userCity.value.trim();
    var cityResultName = "";
  }

  saveUserCity(userCity.value);
  renderCities();

  function saveUserCity(city) {
    var userCity = {
      city: city,
    };
    var cityList = JSON.parse(localStorage.getItem("cityList")) || [];

    var shouldBeAdded = true;
    for (var i = 0; i < cityList.length; i++) {
      if (cityList[i].city.toLowerCase() === city.toLowerCase() || city.length === 0 ) {
        shouldBeAdded = false;
      }
    }
    if (shouldBeAdded) {
      cityList.push(userCity);

      localStorage.setItem("cityList", JSON.stringify(cityList));
    }
  }

  // Showing the cityList
  function renderCities() {
    cityListEl.style.display = "block";
    cityListEl.innerHTML = "";

    var userCityList = document.createElement("ul");

    cityListEl.appendChild(userCityList);

    var cityList = JSON.parse(localStorage.getItem("cityList")) || [];

    for (let i = 0; i < cityList.length; i++) {
      var li = document.createElement("li");
      //var a = document.createElement("a");
      li.textContent = cityList[i].city;
      li.addEventListener("click", function (event) {
        console.log(event.target.textContent);
        getOpenWeatherData(event.target.textContent);
      });
      //a.href = "#";
      userCityList.appendChild(li);
      //li.appendChild(a);
    }

    // clear City search
    var clearCityButton = document.createElement("button");
    clearCityButton.textContent = "Clear the search list";
    cityListEl.appendChild(clearCityButton);

    clearCityButton.addEventListener("click", function () {
      localStorage.clear();
      cityListEl.innerHTML = "";
    });
  }

  function getOpenWeatherData(city) {
    console.log("called", city);
    fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        API_KEY
    )
      .then(function (res) {
        console.log(res);
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
      })
      .then((data) => {
        printCityWeatherData(data);
      });
  }

  function createIcon(iconName) {
    var imgEl = document.createElement("img");
    imgEl.setAttribute(
      "src",
      "http://openweathermap.org/img/wn/" + iconName + ".png"
    );
    return imgEl;
  }

  function formatUNIXDate(unixDate) {
    return new Date(unixDate * 1000).toLocaleDateString();
  }

  function printCityWeatherData(weatherResponse) {
    //console.log(weatherResponse);
    //console.log({ cityResultName });

    currentWeatherTitle.textContent = cityResultName;
    var date = formatUNIXDate(weatherResponse.daily[0].dt);
    var icon = weatherResponse.current.weather[0].icon;
    var temperature = weatherResponse.current.temp;
    var humidity = weatherResponse.current.humidity;
    var windSpeed = weatherResponse.current.wind_speed;
    var uvi = weatherResponse.current.uvi;
    var txtEl = document.createElement("txt");
    txtEl.classList.add("currentDate");
    txtEl.textContent = "(" + date + ")";
    currentWeatherTitle.appendChild(txtEl);
    currentWeatherTitle.appendChild(createIcon(icon));

    var currentWeatherTemp = document.createElement("li");
    var currentWeatherHum = document.createElement("li");
    var currentWeatherWind = document.createElement("li");
    var currentWeatherUV = document.createElement("li");
    currentWeatherTemp.textContent = "Temperature: " + temperature + "°C";
    currentWeatherHum.textContent = "Humidity: " + humidity + " %";
    currentWeatherWind.textContent = "Wind Speed: " + windSpeed + " MPH";
    currentWeatherUV.textContent = "UV Index: " + uvi;
    currentWeatherContent.innerHTML = "";
    currentWeatherContent.appendChild(currentWeatherTemp);
    currentWeatherContent.appendChild(currentWeatherHum);
    currentWeatherContent.appendChild(currentWeatherWind);
    currentWeatherContent.appendChild(currentWeatherUV);
    fiveDaysWeatherEl.innerHTML = "";
    for (var i = 1; i <= 5; i++) {
      var dayForecastBox = document.createElement("div");
      dayForecastBox.classList.add(
        "dayForecastBox",
        "col-12",
        "col-md-2",
        "col-lg-2"
      );
      var dayForecastDateEl = document.createElement("h5");
      var dayForecastList = document.createElement("ul");
      var dayForecastListTemp = document.createElement("li");
      var dayForecastListHum = document.createElement("li");
      //console.log(weatherResponse.daily[i].weather[0].icon)
      dayForecastDateEl.textContent = formatUNIXDate(
        weatherResponse.daily[i].dt
      );
      dayForecastListTemp.textContent =
        "Temperature: " + weatherResponse.daily[i].temp.day + "°C";
      dayForecastListHum.textContent =
        "Humidity: " + weatherResponse.daily[i].humidity + " %";
      dayForecastBox.appendChild(dayForecastDateEl);
      dayForecastBox.appendChild(
        createIcon(weatherResponse.daily[i].weather[0].icon)
      );
      dayForecastBox.appendChild(dayForecastList);
      dayForecastList.appendChild(dayForecastListTemp);
      dayForecastList.appendChild(dayForecastListHum);
      fiveDaysWeatherEl.appendChild(dayForecastBox);
    }
  }

  getOpenWeatherData(cityName);
  // .catch(function (error) {
  //   console.log(error);
  //   alert("Unable to connect to openweathermap");
  // });
}

formEl.addEventListener("submit",(event) => {
  search(event)
} );

window.addEventListener("load", (event) => {
  search(event)
})
