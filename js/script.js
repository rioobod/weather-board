const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");
const searchHistoryDisplay = document.querySelector("#search-history");

// weather fields for current day
const cityNameDisplay = document.querySelector("#city-name");
const currTempDisplay = document.querySelector("#curr-temp");
const currWindDisplay = document.querySelector("#curr-wind");
const currHumidityDisplay = document.querySelector("#curr-humidity");
const currUVDisplay = document.querySelector("#curr-uv");

// display area
const dayDisplay = document.querySelector("#current-day-section");
const dailyForecastDisplay = document.querySelector("#daily-forecast-section");
const dailyForecastList = document.querySelector("#daily-forecast-list");

// icons
const currDayIcon = document.querySelector("#curr-day-icon");

/* moment.js to get day and current hour */
const today = moment().format("MMMM Do YYYY");
const currHour = moment().format("H");

/*   define global variables       */
// API
const apiKey = "d414918c6106647f765457492ea59548";
const baseUrl = "https://api.openweathermap.org/";
const latLongUrl = "data/2.5/onecall?";
const geoLocUrl = "geo/1.0/direct?q=";

// location variables
let tempUnits = "imperial";
let cityName = "";
let stateName = "";
let countryName = "";

// weather variables
let weatherData = [];
let currTemp = 0;
let currWind = 0;
let currHumidity = 0;
let currUV = 0;
let dailyForecast = [];
const dailyForecastLimit = 5;
let currDayIconStyle = "";
const weatherConditions = [
  {
    condition: "Clear",
    icon: "fa-sun",
    color: "#bcaf27",
  },
  {
    condition: "Clouds",
    icon: "fa-cloud",
    color: "#929292",
  },
  {
    condition: "Drizzle",
    icon: "fa-cloud-rain",
    color: "#6db0ab",
  },
  {
    condition: "Rain",
    icon: "fa-cloud-showers-heavy",
    color: "#3e726e",
  },
  {
    condition: "Thunderstorm",
    icon: "fa-poo-storm",
    color: "#738667",
  },
  {
    condition: "Snow",
    icon: "fa-snowflake",
    color: "#b1b8ac",
  },
  {
    condition: "Mist",
    icon: "fa-cloud-rain",
    color: "#6db0ab",
  },
  {
    condition: "Smoke",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Haze",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Dust",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Fog",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Sand",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Ash",
    icon: "fa-smog",
    color: "#646060",
  },
  {
    condition: "Squall",
    icon: "fa-wind",
    color: "#898383",
  },
  {
    condition: "Tornado",
    icon: "fa-wind",
    color: "#898383",
  },
];
// add an event listener to the search button
searchBtn.addEventListener("click", getWeatherData);
searchForm.addEventListener("submit", getWeatherData);

// call api for weather data
async function getWeatherData(event) {
  event.preventDefault();

  let lat = 0;
  let long = 0;
  let searchName = "";

  if (searchInput.value) {
    searchName = searchInput.value.toLowerCase();
    searchInput.value = "";
  } else {
    searchName = cityName.toLowerCase();
  }

  const locData = await fetch(
    baseUrl + geoLocUrl + searchName + "&appid=" + apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      if (data[0].name) {
        lat = data[0].lat;
        long = data[0].lon;
        cityName = data[0].name;
        stateName = data[0].state;
        countryName = data[0].country;
      }
    })
    .catch((e) => console.log(e));

  const forecast = await fetch(
    baseUrl +
      latLongUrl +
      "lat=" +
      lat +
      "&lon=" +
      long +
      "&units=" +
      tempUnits +
      "&appid=" +
      apiKey
  )
    .then((response) => response.json())
    .then((data) => {
      weatherData = data;
      console.log(data);
    })
    .catch((e) => console.log(e));
    //setWeatherData(weatherData); function to add data to the dom
}


