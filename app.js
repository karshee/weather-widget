window.addEventListener('load', ()=> {
let long;
let lat;
let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let locationTimezone = document.querySelector('.location-timezone');


if(navigator.geolocation){
  navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    long = position.coords.longitude;
    lat = position.coords.latitude;

    const proxy = "https://cors-anywhere.herokuapp.com/";

    const api = `${proxy}https://api.darksky.net/forecast/b4441e271d5ed8a3adc1752a49f2c7a3/${lat},${long}`;

    
  fetch(api)
  .then(response => {
    return response.json();
  })
  .then(data =>{
    // console.log(data);
    const {temperature, summary, icon } = data.currently; //data.currently.temperature
    //set DOM elements from api
    temperatureDegree.textContent =Math.round( temperature - 32)*(5/9) + "°C";
    temperatureDescription.textContent = summary;
    locationTimezone.textContent = data.timezone;
    //set Icon
    setIcons(icon, document.querySelector('.icon'));
  });

  });



}else{
  h1.textContent = "hey this is not working because you've not allowed location";
}

function setIcons(icon, iconID){
  const skycons = new Skycons ({color:"white"});
  const currentIcon = icon.replace(/-/g, "_").toUpperCase(); //replace - with _ because of api icon format and skycons format difference
  skycons.play();
  return skycons.set(iconID, Skycons[currentIcon]);
}
});