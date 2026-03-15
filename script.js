const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");
const historyDiv = document.getElementById("history");
const consoleBox = document.getElementById("console");

console.log("Weather Tracker Loaded");
function log(message){
consoleBox.textContent += message + "\n";
}

log("Sync Start");

setTimeout(()=>{
log("setTimeout (Macrotask)");
},0);

Promise.resolve().then(()=>{
log("Promise.then (Microtask)");
});

log("Sync End");
searchBtn.addEventListener("click", ()=>{

const city = cityInput.value.trim();

if(city === ""){
weatherDiv.innerHTML = "Please enter a city name";
return;
}

getWeather(city);

});
async function getWeather(city){

log("[Async] Start fetching");

const geoURL =
`https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

const geoResponse = await fetch(geoURL);
const geoData = await geoResponse.json();

console.log(geoData);

}
async function getWeather(city){

try{

const geoURL =
`https://geocoding-api.open-meteo.com/v1/search?name=${city}`;

const geoResponse = await fetch(geoURL);
const geoData = await geoResponse.json();

if(!geoData.results){
weatherDiv.innerHTML = "City not found";
return;
}

const lat = geoData.results[0].latitude;
const lon = geoData.results[0].longitude;

const weatherURL =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

const weatherResponse = await fetch(weatherURL);
const weatherData = await weatherResponse.json();

displayWeather(city, weatherData.current_weather);

}
catch(error){
weatherDiv.innerHTML = "Network Error";
}

}