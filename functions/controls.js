let currentTime = new Date();
let todaysDate = document.querySelector("#date-time");

function presentDate(days) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[days.getDay()];
  let hour = days.getHours();
  let mins = days.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }
  let displayzz = `${day}, ${hour}:${mins}`;
  return displayzz;
}

todaysDate.innerHTML = presentDate(currentTime);

function temps(event) {
  event.preventDefault();
  let celcius = document.querySelector("#celcuis");
  let fahrenheit = Math.round(15 * (9 / 5) + 32);
  celcius.innerHTML = `${fahrenheit}`;
}
let changeTemp = document.querySelector("#tempo");
changeTemp.addEventListener("click", temps);

function searchPlaceDetails(response) {
  let h2 = document.querySelector("h2");
  h2.innerHTML = response.data.name;

  let temps = document.querySelector("#tempo");
  temps.innerHTML = Math.round(response.data.main.temp);

  let precip = document.querySelector("#precipitation");
  precip.innerHTML = response.data.main.pressure;

  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let humid = document.querySelector("#humidity");
  humid.innerHTML = Math.round(response.data.main.humidity);

  let description = document.querySelector("#describe");
  description.innerHTML = response.data.weather[0].main;
}

let searchButton = document.querySelector("#submit");
searchButton.addEventListener("click", searchPlaceDetails);

function searchCityNow(cities) {
  let apiKey = "65b8a4abf05d262fe36154b3ba5ad001";
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchPlaceDetails);
}
function searchCity(event) {
  event.preventDefault();
  let myCity = document.querySelector("#city").value;
  searchCityNow(myCity);
}

function currentPlace(position) {
  let apiKey = "65b8a4abf05d262fe36154b3ba5ad001";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(searchPlaceDetails);
}

let searches = document.querySelector("#search-bar");
searches.addEventListener("submit", searchCity);

function printCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPlace);
}

let myLoc = document.querySelector("#current-Loc");
myLoc.addEventListener("click", printCurrentCity);
