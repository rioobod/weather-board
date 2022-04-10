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

// remove children from a DOM element
function removeChildren(parent) {
    while(parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

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
    setWeatherData(weatherData); 
}

function setWeatherData(weatherData) {
    if (cityName) {
      currTemp = Math.round(weatherData.current.temp);
      currWind = weatherData.current.wind_speed;
      currHumidity = weatherData.current.humidity;
      currUV = weatherData.current.uvi;
  
      weatherConditions.forEach((item) => {
        if (item.condition === weatherData.current.weather[0].main) {
          currDayIconStyle = item.icon;
          currDayIcon.classList.add("fas");
          currDayIcon.classList.add(item.icon);
          currDayIcon.classList.add("fa-3x");
          currDayIcon.style.color = item.color;
        }
      });
  
      dailyForecast = weatherData.daily;
      showWeatherForecast();
    } else {
      console.log("no valid city");
    }
  }
  function showWeatherForecast() {
    dayDisplay.classList.remove("hide");
  
    let uvStyle = "";
  
    if (currUV < 3) {
      uvStyle = "uvi-favorable";
    } else if (currUV > 2 && currUV < 6) {
      uvStyle = "uvi-moderate";
    } else {
      uvStyle = "uvi-severe";
    }
  
    cityNameDisplay.innerText = `${cityName}, ${stateName} - ${today}`;
    currTempDisplay.innerHTML = `${currTemp}&deg`;
    currWindDisplay.innerText = `${currWind} mph`;
    currHumidityDisplay.innerText = `${currHumidity}%`;
    currUVDisplay.classList.add(uvStyle);
    currUVDisplay.innerText = `${currUV}`;

    showDailyForecast();
  }

  // function to show the daily forecast
function showDailyForecast() {

    dailyForecastDisplay.classList.remove("hide");

    let limit = 1;

    removeChildren(dailyForecastList);

    dailyForecast.forEach(day => {
        if (limit <= dailyForecastLimit) {
            let date = moment().add(limit, "days").format("MMMM Do");
            let div = document.createElement("div");
            let uvStyle = "";
            let iconStyle = "";
            let iconColor = ""

            div.classList.add("card");
       
            if (day.uvi < 3) {
                uvStyle = "uvi-favorable"
            } else if (day.uvi > 2 && day.uvi < 6) {
                uvStyle = "uvi-moderate";
            } else {
                uvStyle = "uvi-severe"
            }

            weatherConditions.forEach(item => {
                if (item.condition === day.weather[0].main) {
                    iconStyle = item.icon;
                    iconColor = item.color;
                }
            })

            div.innerHTML = `
            <h6 class="card-header">${date} </h6>
            <i class="fas ${iconStyle} fa-lg" style="color: ${iconColor}"></i>
            <ul class="list-group list-group-slush">
                <li class="list-group-item data-display">
                    <h7>Temp: </h7>
                    <p class="card-text">${day.temp.day}&deg</p>
                </li>
                <li class="list-group-item data-display">
                    <h7>Wind Speed: </h7>
                    <p class="card-text">${day.wind_speed} mph</p>
                </li>
                <li class="list-group-item data-display">
                    <h7>Humidity: </h7>
                    <p class="card-text">${day.humidity}%</p>
                </li>
                <li class="list-group-item data-display">
                    <h7>UV Index: </h7>
                    <p class="card-text ${uvStyle}">${day.uvi}</p>
                </li>
            </ul>
            `;
            limit++
            dailyForecastList.appendChild(div);
        }
    })
}
