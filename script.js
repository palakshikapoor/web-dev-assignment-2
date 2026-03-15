const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherDiv = document.getElementById("weather");
const historyDiv = document.getElementById("history");
const consoleBox = document.getElementById("console");

function log(msg){
consoleBox.textContent += msg + "\n";
}

searchBtn.addEventListener("click", ()=>{

consoleBox.textContent = "";

log("Sync Start");

setTimeout(()=>{
log("setTimeout (Macrotask)");
},0);

Promise.resolve().then(()=>{
log("Promise.then (Microtask)");
});

log("Sync End");

const city = cityInput.value.trim();

if(city===""){
weatherDiv.innerHTML="Enter city name";
return;
}

getWeather(city);

});


async function getWeather(city){

log("[Async] Start fetching");

try{

const geoResponse =
await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);

const geoData = await geoResponse.json();

if(!geoData.results){
weatherDiv.innerHTML="City not found";
return;
}

const lat = geoData.results[0].latitude;
const lon = geoData.results[0].longitude;

const weatherResponse =
await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);

const weatherData = await weatherResponse.json();

displayWeather(city, weatherData.current_weather);

saveHistory(city);

log("[Async] Data received");

}
catch(error){

weatherDiv.innerHTML="Network Error";

}

}


function displayWeather(city,data){

weatherDiv.innerHTML = `
<p><b>City:</b> ${city}</p>
<p><b>Temp:</b> ${data.temperature} °C</p>
<p><b>Wind:</b> ${data.windspeed} km/h</p>
`;

}


function saveHistory(city){

let history = JSON.parse(localStorage.getItem("cities")) || [];

if(!history.includes(city)){
history.push(city);
}

localStorage.setItem("cities", JSON.stringify(history));

loadHistory();

}


function loadHistory(){

historyDiv.innerHTML="";

let history = JSON.parse(localStorage.getItem("cities")) || [];

history.forEach(city=>{

let btn=document.createElement("button");

btn.textContent=city;
btn.className="historyBtn";

btn.onclick=()=>{
getWeather(city);
};

historyDiv.appendChild(btn);

});

}

window.onload = loadHistory;