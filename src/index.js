//Applies new city name to page when user searches that city. 
function presentChange(response){
    let name = (response.data.name);
    let temp = Math.round(response.data.main.temp);
    let updateCurrentTemp = document.querySelector("#currentLocalTemp");
    updateCurrentTemp.innerHTML = `${temp}`;
    let updateSearchLocation = document.querySelector("#alertUserOfSearch");
    updateSearchLocation.innerHTML = `${name}`;
}

function newSearch(event) {
  event.preventDefault();
  let input = document.querySelector("#newSearch");
  let newLocation = (input.value);
  let apiKey = "3188f707d8d8b76ee51ef636790f1649";
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${newLocation}&appid=${apiKey}&units=metric`
  axios.get(apiURL).then(presentChange);
}

let searchLocationButton = document.querySelector("#newSearchButton");
searchLocationButton.addEventListener("click", newSearch);

//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
function handlePosition(position) {
  let latitude = (position.coords.latitude);
  let longitude = (position.coords.longitude);
  let apiURLByGeolocation = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&cnt=1&appid=3188f707d8d8b76ee51ef636790f1649&units=metric`
  axios.get(apiURLByGeolocation).then(presentChange);
}

function searchByGeolocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(handlePosition)
}

let geolocationButton = document.querySelector("#geolocation");
geolocationButton.addEventListener("click", searchByGeolocation)