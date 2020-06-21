// Initialise Storage
const storage = new Storage();

// Get Stored Location Data
const weatherLocation = storage.getLocationData(
);

// Initialise Weather class
const weather = new Weather(weatherLocation.lat, weatherLocation.long);

// Initialise Weather class
const ui = new UI();


// Get weather on Dom Load

document.addEventListener('DOMContentLoaded', getLocation());
document.getElementById('w-reset-btn').addEventListener('click',(e)=>{
  resetLocation()
  // Close Modal
  $('#locModal').modal('hide');
});

document.getElementById('w-change-btn').addEventListener('click',(e)=>
{
  const long = document.getElementById('long').value;
  const lat = document.getElementById('lat').value;

  // set local in local storage
  storage.setLocalData(long,lat);

  getWeather(long,lat);

  // Close Modal
  $('#locModal').modal('hide');
});



    // work out location

    function getLocation() {
      // skip if location has been set in local storage
      if(localStorage.getItem('long') === null){
        // get location from browser
        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(showPosition);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
      }else{
        // take location from local storage
        this.lat = localStorage.getItem('lat');
        this.long = localStorage.getItem('long');
        getWeather(long,lat);
      }
    }
  // get Coordinates from location & send to Weather API
    function showPosition(position) {
        lat = JSON.stringify(position.coords.latitude);
        long= JSON.stringify(position.coords.longitude);
        //console.log(lat,long);
        getWeather(long,lat);
      }


// reset location
      function resetLocation(){
        localStorage.removeItem('lat'); 
        localStorage.removeItem('long');
        getLocation();
      }

// Get weather
function getWeather(long,lat){
    weather.getWeather(long,lat)
        .then(results => 
            ui.paint(results)
            //console.log(results);
            )
        .catch(err => console.log(err))

}


