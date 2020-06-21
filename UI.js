
class UI {
    constructor(){
        this.location = document.getElementById('w-location');
        //this.main = document.getElementById('w-main');
        this.details = document.getElementById('w-desc');
        this.icon = document.getElementById('w-icon');
        this.temp = document.getElementById('w-temp');
        this.humidity = document.getElementById('w-humidity');
        this.feelslike = document.getElementById('w-feels-like');
        this.dewpoint = document.getElementById('w-dewpoint');
        this.wind = document.getElementById('w-wind');
        this.dayLength = document.getElementById('w-dayLength');
        this.lightRemain = document.getElementById('w-lightRemain');
        this.cloud = document.getElementById('w-cloud');
        this.rain = document.getElementById('w-rain');
        this.snow = document.getElementById('w-snow');
    }

    paint(weather){
        
        const sunrise = weather.current.sunrise;
        const sunset = weather.current.sunset;
        const lightTime = (Number(sunset)-Number(sunrise));


        // work out time remaining before sunset
        const time = sunset - weather.current.dt;
        var rDate = new Date(time * 1000);
        // Hours part from the timestamp
        var rHours = rDate.getHours();
        // Minutes part from the timestamp
        var rMinutes = "0" + rDate.getMinutes();
        // Seconds part from the timestamp
        var rSeconds = "0" + rDate.getSeconds();
        // Will display time in 11:10:22 format
        var formatTime = rHours + ':' + rMinutes.substr(-2) + ':' + rSeconds.substr(-2);

        
        if(time > lightTime) {
            this.lightRemain.textContent = "Light remaining 00:00";
        } else {
            this.lightRemain.textContent = "Light remaining "+formatTime;
        };
        //else {
        //    this.lightRemain.textContent = formatTime;
        //};
      
        console.log(this.lightRemain.textContent);

        
        // Convert light time to readable
        // the time into milliseconds by multiplying it by 1000.
        var lDate = new Date(lightTime * 1000);
        // Hours part from the timestamp
        var lHours = lDate.getHours();
        // Minutes part from the timestamp
        var lMinutes = "0" + lDate.getMinutes();
        // Seconds part from the timestamp
        var lSeconds = "0" + lDate.getSeconds();
        // Will display time in 11:10:22 format
        var formatTime = lHours + ':' + lMinutes.substr(-2) + ':' + lSeconds.substr(-2);
 
        this.dayLength.textContent = "Day Length "+formatTime;
        

        //this.lightRemain.textContent = hours;
        this.location.textContent = weather.timezone;
        
        this.details.textContent = weather.current.weather[0].description;
        this.icon.textContent = weather.current.weather[0].icon;
        this.temp.textContent ="Temperature: "+ weather.current.temp +"C";
        this.humidity.textContent ="Humidity: "+ weather.current.humidity;
        this.feelslike.textContent = "Feels Like: "+ weather.current.feels_like+"C";
        this.dewpoint.textContent = "Dewpoint: "+ weather.current.dew_point;
        this.cloud.textContent = "Cloud Cover: "+ weather.current.cloud+"%";
        // default rainfall to zero
        if(weather.current.rain =" "){
                              var  rainfall = "0.00";
        }else{
            var rainfall = weather.current.rain;
        }
        if(weather.current.snow =" "){
            var  snowfall = "0.00";
        }else{
        var snowfall = weather.current.snow;
        }

        this.rain.textContent = "Rain fall: "+ rainfall+"mm";
        this.snow.textContent = "Snow fall: "+ snowfall+"mm";
        this.wind.textContent ="Wind Speed: "+ weather.current.wind_speed+"m/s";
    }

}