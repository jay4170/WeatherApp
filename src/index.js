//find out why the data from the form doesnt work after clicking current location button

import "./style.css";
import userLocationButton from "./userLocation";

let metric = true; //used to switch between F and C, will be used for any other units
let API = "9e32ebf31a192c3c338b158df594ca5f";

function pageLoad() {
  const body = document.body;
  const pageBox = document.createElement("div");
  const weatherBox = document.createElement("div");
  weatherBox.id = "weather_box";

  //add map
  //const googleMap = document.createElement("iframe")
  //googleMap.src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7233236948!2d-0.38246564411227363!3d51.52873356434025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon!5e0!3m2!1sen!2suk!4v1648228997614!5m2!1sen!2suk"

  pageBox.append(unitSwitcher());
  pageBox.append(userLocationButton());
  pageBox.append(newWeatherFormCreator());

  pageBox.append(weatherBox);

  body.append(pageBox);
}

////////////////////////////////////////////////////////////////
//changes the metric global variable
function freedomUnits() {
  let switcher = document.getElementById("unit_switcher");
  2;
  if (metric == true) {
    metric = false;
    switcher.textContent = "Freedom units";
  } else if (metric == false) {
    metric = true;
    switcher.textContent = "Metric units";
  }
}

//creates a button and toggles the name displayed
function unitSwitcher() {
  const switcher = document.createElement("button");
  switcher.id = "unit_switcher";
  switcher.textContent = "Metric units";
  switcher.addEventListener("click", function () {
    freedomUnits();
  });
  return switcher;
}
///////////////////////////////////////////////////
// creates a basic form that takes input and fires off getWeather function
function newWeatherFormCreator() {
  const newWeatherForm = document.createElement("form");
  newWeatherForm.id = "new_weather_form";
  const latBoxInfo = document.createElement("label");
  latBoxInfo.textContent = "Enter Latitude:";
  latBoxInfo.for = "lat_box";
  const latBox = document.createElement("input");
  latBox.id = "lat_box";
  latBox.value = 1;
  const lonBoxInfo = document.createElement("label");
  lonBoxInfo.textContent = "Enter Longitude:";
  lonBoxInfo.for = "lon_box";
  const lonBox = document.createElement("input");
  lonBox.value = 1;
  lonBox.id = "lon_box";
  const submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  function handleForm(e) {
    e.preventDefault();
    getWeather(latBox.value, lonBox.value);
  }
  newWeatherForm.addEventListener("submit", handleForm);

  newWeatherForm.append(lonBoxInfo);
  newWeatherForm.append(lonBox);
  newWeatherForm.append(latBoxInfo);
  newWeatherForm.append(latBox);
  newWeatherForm.append(submitBtn);
  return newWeatherForm;
}
function toC(kelvin) {
  return kelvin - 273.15;
}
function toF(kelvin) {
  kelvin = parseFloat(kelvin);
  return (kelvin - 273.15) * 1.8 + 32;
}
//////////////////////////////////////////////////////
async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`
  );
  const cleaned = await response.json();
  weatherViewer(cleaned);
}
//This is the box that appears when weather has been requested
function weatherViewer(weatherObject) {
  const weatherBoxDiv = document.getElementById("weather_box");
  weatherBoxDiv.replaceChildren("");
  const location = document.createElement("h1");
  location.innerText = weatherObject.name;
  const temperature = document.createElement("h2");
  if (metric == true) {
    temperature.innerText = toC(weatherObject.main.temp) + "C";
  } else if (metric == false) {
    temperature.innerText = toF(weatherObject.main.temp) + "F";
  }

  const weather = document.createElement("h2");
  weather.innerText = weatherObject.weather[0].main;

  weatherBoxDiv.append(location);
  weatherBoxDiv.append(temperature);
  weatherBoxDiv.append(weather);
}

pageLoad();
