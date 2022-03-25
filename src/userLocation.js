export default function userLocationButton() {
  const button = document.createElement("button");
  button.innerText = "Current Location";
  button.addEventListener("click", function (f) {
    getLocation();
  });
  return button;
}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  }
}
function showPosition(position) {
  document.getElementById("lat_box").value = position.coords.latitude;
  document.getElementById("lon_box").value = position.coords.longitude;
}
