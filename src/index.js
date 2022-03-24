import "./style.css";
import userLocationButton from "./getLocationButton";

let metric = true;
let API = "9e32ebf31a192c3c338b158df594ca5f";
const body = document.body;
let lat = 1;
let lon = 1;
//////////////////////////////////////////////////

////////////////////////////////////////////////////
function pageLoad() {
  const pageBox = document.createElement("div");
  const weatherBox = document.createElement("div");

  pageBox.append(unitSwitcher());
  pageBox.append(userLocationButton());
  pageBox.append(newWeatherFormCreator());

  pageBox.append(weatherBox);

  body.append(pageBox);
}
function newWeatherFormCreator() {
  const newWeatherForm = document.createElement("form");
  newWeatherForm.id = "new_weather_form";

  const latBoxInfo = document.createElement("label");
  latBoxInfo.textContent = "Enter Latitude:";
  latBoxInfo.for = "lat_box";
  const latBox = document.createElement("input");
  latBox.id = "lat_box";
  latBox.value = lon;

  const lonBoxInfo = document.createElement("label");
  lonBoxInfo.textContent = "Enter Longitude:";
  lonBoxInfo.for = "lon_box";
  const lonBox = document.createElement("input");
  lonBox.value = lon;
  lonBox.id = "lon_box";

  newWeatherForm.append(lonBoxInfo);
  newWeatherForm.append(lonBox);
  newWeatherForm.append(latBoxInfo);
  newWeatherForm.append(latBox);
  return newWeatherForm;
}
////////////////////////////////////////////////////////////////
function freedomUnits() {
  let switcher = document.getElementById("unit_switcher");
  if (metric == true) {
    metric = false;
    switcher.textContent = "Freedom units";
  } else if (metric == false) {
    metric = true;
    switcher.textContent = "Metric units";
  }
}
function unitSwitcher() {
  const switcher = document.createElement("button");
  switcher.id = "unit_switcher";
  switcher.textContent = "Metric units";
  switcher.addEventListener("click", function (f) {
    freedomUnits();
  });
  return switcher;
}
///////////////////////////////////////////////////


async function getWeather(lat, lon) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`
  );
  const cleaned = response.json();

  //add feature to search by city name
  //loading screen
  //fetch from api
  //parse information
  //change dom elements
}
getWeather(lat, lon);
pageLoad();
