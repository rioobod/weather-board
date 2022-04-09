const searchForm = document.querySelector("#search-form");
const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector("#search-input");

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

// add an event listener to the search button
searchBtn.addEventListener("click", getWeatherData);
searchForm.addEventListener("submit", getWeatherData)

// call api for weather data
async function getWeatherData(event) {

    event.preventDefault();

    let lat = 0;
    let long = 0;
    let searchName = "";

    if (searchInput.value) {
        searchName = searchInput.value.toLowerCase();
        searchInput.value = ""
    } else {
        searchName = cityName.toLowerCase();
    }

    const locData = await
        fetch(baseUrl + geoLocUrl + searchName + "&appid=" + apiKey)
        .then(response => response.json())
        .then(data => {
            if (data[0].name) {
                lat = data[0].lat;
                long = data[0].lon;
                cityName = data[0].name;
                stateName = data[0].state;
                countryName = data[0].country
            }
        })
        .catch(e => console.log(e));

    const forecast = await
        fetch(baseUrl + latLongUrl + "lat=" + lat + "&lon=" + long + "&units=" + tempUnits + "&appid=" + apiKey)
            .then(response => response.json())
            .then(data => {
                weatherData = data;
                console.log(data);
            })
            .catch(e => console.log(e));


}