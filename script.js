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
