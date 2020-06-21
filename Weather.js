class Weather{
    constructor(){
        this.apiKey = 'd4170f14222aeefb021bb262db09e4cc';

        // set default coordinates
        this.lat = lat;
        if( this.lat = " "){
           this.lat = "90";
        }
        this.long = long;
        if( this.long = " "){
            this.long = "90";
         }

    }

    // Fetch Weather from API
    async getWeather(long, lat){
        this.lat = lat;
        this.long = long;
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.long}&appid=${this.apiKey}&units=metric`);


        const responseData = await response.json();
        
        console.log(JSON.parse(JSON.stringify(responseData.current.weather[0])));
        //console.log(responseData.current.weather[0].main)
        return responseData;
    } 

    // Change weather location

    changeLocation(city,state){
        this.city = city;
        this.state = state;
    }



}