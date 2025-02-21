let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[now.getMonth()];
let currentDate = now.getDate();
let currentYear = now.getFullYear();
let currentHours = now.getHours();
if (currentHours < 10) {
  currentHours = `0${currentHours}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

h2.innerHTML = `Date: ${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}`;
h3.innerHTML = `Time:${currentHours}:${currentMinutes}`;
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");

  let h1 = document.querySelector("#city");
  h1.innerHTML = `${searchInput.value}`;
}
let form = document.querySelector("#search-form");

form.addEventListener("submit", search);

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#maxTemp").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#minTemp").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].main;
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#fahrenheit-link");
  temperatureElement.innerHTML = 0;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#celcius-link");
  temperatureElement.innerHTML = 0;
}

function citySearch(city) {
  let apiKey = "422322349534642ac76794e02793b80f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherCondition);
}

function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  citySearch(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchSubmit);

function retrievePosition(position) {
  let apiKey = "422322349534642ac76794e02793b80f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(displayWeatherCondition);
}

navigator.geolocation.getCurrentPosition(retrievePosition);
