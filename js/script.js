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