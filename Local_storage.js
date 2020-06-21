class Storage {
    constructor(){
        this.lat;
        this.long;
        this.defaultLat = "0";
        this.defaultLong ="0";
    }

    getLocationData(){
            if(localStorage.getItem('lat') === null){
                this.lat = this.defaultLat;
            }else{
                this.lat = localStorage.getItem('lat');
            }
            if(localStorage.getItem('long') === null){
                this.long = this.defaultLong;
            }else{
                this.long = localStorage.getItem('long');
            }
        return {
            lat: this.lat,
            long: this.long    
        }    
        }
    


    setLocalData(lat,long){
        localStorage.setItem('lat',lat);
        localStorage.setItem('long',long);
    }
}