//update weather description when new search entered
function replaceWeatherDescription (response) {
    let newWeatherDesc = response.data.weather[0].description
    let updateWeatherDescrip = document.querySelector("#descriptionOfWeather");
    updateWeatherDescrip.innerHTML=`${newWeatherDesc}`
}

//Applies new city name to page when user searches that city. 
function replaceSearchLocation(response){
    let name = (response.data.name);
    let updateSearchLocation = document.querySelector("#alertUserOfSearch");
    updateSearchLocation.innerHTML = `${name}`;
}

function replaceTemp (response){
    temp = Math.round(response.data.main.temp);
    let updateCurrentTemp = document.querySelector("#currentLocalTemp");
    updateCurrentTemp.innerHTML = `${temp}`;
}

function replaceCurrentWeatherIcon(response){
    let currentIcon = (response.data.weather[0].icon);
    let updateWeatherIcon = document.querySelector("#currentWeatherIcon");
    updateWeatherIcon.setAttribute ("src",`https://openweathermap.org/img/wn/${currentIcon}@2x.png`);
}

function replaceWind (response){
    let wind = (response.data.wind.speed);
    let updateWind = document.querySelector("#displayWind");
    updateWind.innerHTML = `${wind} m/s`;
}

function replaceHumidity(response){
    let humidity = (response.data.main.humidity);
    let updateHumidity = document.querySelector("#displayHumidity");
    updateHumidity.innerHTML= `${humidity}%`;
}

function timeOfSearch (){
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = ('0' + now.getMinutes()).slice(-2);
    let updateSearchTime = document.querySelector("#SearchTime");
    updateSearchTime.innerHTML = (`${currentHour}:${currentMinute}`);
}

function presentChange(response){
    replaceSearchLocation (response);
    replaceWeatherDescription(response);
    replaceTemp(response);
    replaceCurrentWeatherIcon(response);
    replaceHumidity(response);
    replaceWind (response);
    timeOfSearch();
    tempInCelcius = Math.round(response.data.main.temp);
}

function newSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#newSearch");
  let newLocation = (input.value);
  let apiKey = "3188f707d8d8b76ee51ef636790f1649";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${apiKey}&units=metric`
  axios.get(apiURL).then(presentChange);
}

let searchLocationButton = document.querySelector("#newSearchButton");
searchLocationButton.addEventListener("click", newSearch);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function handlePosition(position) {
  let latitude = (position.coords.latitude);
  let longitude = (position.coords.longitude);
  let apiURLByGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=1&appid=3188f707d8d8b76ee51ef636790f1649&units=metric`
  axios.get(apiURLByGeolocation).then(presentChange);
}

function searchByGeolocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition)
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", searchByGeolocation)

function convertToFahrenheit(event){
    event.preventDefault();
    let tempInFahrenheit = Math.round((tempInCelcius*(9/5))+35);
    currentTempDisplayed.innerHTML = (`${tempInFahrenheit}`);
}

let currentTempDisplayed = document.querySelector("#currentLocalTemp");

let tempInCelcius = null;
let temp = null;
let displayTempFahrenheit = document.querySelector("#changeToFehrenheit");
displayTempFahrenheit.addEventListener("click", convertToFahrenheit);


function converToCelcius (event){
    event.preventDefault();
    currentTempDisplayed.innerHTML = (`${tempInCelcius}`)
}

let displayTempCelcius = document.querySelector("#changeToCelcius");
displayTempCelcius.addEventListener("click", converToCelcius);

function initialDisplay(){
  let initialApiURL = `https://api.openweathermap.org/data/2.5/weather?q=GuangZhou&appid=3188f707d8d8b76ee51ef636790f1649&units=metric`
  axios.get(initialApiURL).then(presentChange);
}

initialDisplay();