
// Add Chart on Load

document.addEventListener('DOMContentLoaded', function () {
    var myChart = Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Calories'
        },
        xAxis: {
            //categories: ['1', '2', '3']
            categories: DataCtrl.getDateRange()
        },
        yAxis: {
            title: {
                text: 'Calories'
            }
        },
        series: [{
            name: 'Burn',
            data: DataCtrl.getBurns(DataCtrl.getDateRange())
            //data: [10, 7, 8]
        }, {
            name: 'Gain',
            data: DataCtrl.getGains(DataCtrl.getDateRange())
            //data: [5, 7, 3]
        }, {
            name: 'Total',
            data: DataCtrl.getTotals(DataCtrl.getDateRange())
            //data: [5, 0, 5]
        }
    ]
    });
});

// Data Control
const DataCtrl = (function(){
    return {
        // public methods
    getActivitiesFromStorage: function(){
    let activities;
    if(localStorage.getItem('activities') === null){
        activities = [];
    }else{
        activities = JSON.parse(localStorage.getItem('activities'));
    }
    return activities;
    },
    getFirstDate: function(){
        activities = this.getActivitiesFromStorage();
       // console.log(activities);
        let firstActivity = '9999-12-30';
        activities.forEach(function(activity){
            if(activity.date < firstActivity){
                firstActivity = activity.date;
            }    
        });
        return firstActivity;
    },
    getLastDate: function(){
        activities = this.getActivitiesFromStorage();
       // console.log(activities);
        let lastActivity = '0000-01-01';
        activities.forEach(function(activity){
            if(activity.date > lastActivity){
                lastActivity = activity.date;
            }    
        });
        return lastActivity;
    },
    getDateRange: function(){

        dateRange = Array(); 
        
        var start = new Date(DataCtrl.getFirstDate());
        var end = new Date(DataCtrl.getLastDate());
                
        var loop = new Date(start);   
        
        while(loop <= end){          
        
           var newDate = loop.setDate(loop.getDate() + 1);
           loop = new Date(newDate);
           yyyy = loop.getFullYear();
           mm = Number(loop.getMonth())+1;
           if(mm<10){
            mm = '0' + mm;
           }
           
           if(loop.getDate()<10){
            dd ='0'+loop.getDate()
           }else{
            dd = loop.getDate();
           }

           date = yyyy+'-'+mm+'-'+dd;
           
           dateRange.push(date);
        }
        return dateRange;
    },
    getBurns: function(dates){
        burns = Array();
        let burn = 0;
        activities = DataCtrl.getActivitiesFromStorage();
        dates.forEach(function(date){
            
            // for each date total burned calories
            activities.forEach(function(activity){

                if(JSON.stringify(activity.date) === JSON.stringify(date)){
                    if(activity.type === 'Burn'){
                    burn += activity.calories;
                    }
                }
            });
            burns.push(burn);
            burn = 0;
        });
        return burns;
    },
    getGains: function(dates){
        gains = Array();
        let gain = 0;
        activities = DataCtrl.getActivitiesFromStorage();
        dates.forEach(function(date){
            
            // for each date total burned calories
            activities.forEach(function(activity){

                if(JSON.stringify(activity.date) === JSON.stringify(date)){
                    if(activity.type === 'Gain'){
                    gain += activity.calories;
                    }
                }
            });
            gains.push(gain);
            gain = 0;
        });
        return gains;
    },
    getTotals: function(dates){
        totals = Array();
        let total = 0;
        activities = DataCtrl.getActivitiesFromStorage();
        dates.forEach(function(date){
            
            // for each date total burned calories
            activities.forEach(function(activity){

                if(JSON.stringify(activity.date) === JSON.stringify(date)){
                    if(activity.type === 'Gain'){
                        total += activity.calories;
                    }else {
                        total -= activity.calories;
                    }
                }
            });
            totals.push(total);
            total = 0;
        });
        return totals;
    }
}
})();





