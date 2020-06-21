// Storage Controller
const StorageCtrl = (function(){
    return {
        // public methods
        storeActivity: function(activity){
            let activities = [];

            // check local storage for items
            if(localStorage.getItem('activities') === null){
                activities = [];
                // push new Item
                activities.push(activity);
                // set local storage
                localStorage.setItem('activities',JSON.stringify(activities));
            }else{
                // Get Items from Local storage
                activities = JSON.parse(localStorage.getItem('activities'));
                // Push new Item
                activities.push(activity);

                // update Local storage
                localStorage.setItem('activities', JSON.stringify(activities));
            }
            
        },     
        getItemsFromStorage: function(){
            let items;
            if(localStorage.getItem('items') === null){
                items = [];
            }else{
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        getActivitiesFromStorage: function(){
            let activities;
            if(localStorage.getItem('activities') === null){
                activities = [];
            }else{
                activities = JSON.parse(localStorage.getItem('activities'));
            }
            return activities;
        },
        get28DayActivitiesFromStorage: function(){
            let activities;
            if(localStorage.getItem('TwentyEightdayActivities') === null){
                activities = [];
            }else{
                activities = JSON.parse(localStorage.getItem('TwentyEightdayActivities'));
            }
            return activities;
        },
        get7DayActivitiesFromStorage: function(){
            let activities;
            if(localStorage.getItem('7dayActivities') === null){
                activities = [];
            }else{
                activities = JSON.parse(localStorage.getItem('7dayActivities'));
            }
            return activities;
        },
        getTodayActivitiesFromStorage: function(){
            let activities;
            if(localStorage.getItem('todayActivities') === null){
                activities = [];
            }else{
                activities = JSON.parse(localStorage.getItem('todayActivities'));
            }
            return activities;
        },
        updateActivityStorage: function(updatedActivity){
            let activities = JSON.parse(localStorage.getItem('activities'));
            currentActivity = ActivityCtrl.getCurrentActivity();
            activities.forEach(function(activity, index){
                if(currentActivity.id === activity.id){
                    activities.splice(index, 1, updatedActivity);
                }
            });
            localStorage.setItem('activities', JSON.stringify(activities));
            
        },
        deleteActivityFromStorage: function(id){
            let activities = JSON.parse(localStorage.getItem('activities'));
            
            activities.forEach(function(activity, index){
                if(id === activity.id){
                    activities.splice(index, 1);
                }
            });
            localStorage.setItem('activities', JSON.stringify(activities));
            
        },
        activityToday: function(){
            let activities = StorageCtrl.getActivitiesFromStorage();
            let today = new Date().toISOString().slice(0, 10);

            let todayActivities = [];
            activities.forEach(function(activity){
                if(today === activity.date){
                    todayActivities.push(activity);
                }
            });
            localStorage.setItem('todayActivities', JSON.stringify(todayActivities));
        },
        activitySevenday: function(){
            let activities = StorageCtrl.getActivitiesFromStorage();
            let today = new Date();
            let MinusSevenday = today.getTime() - 604800000;
            let sevendayActivities = [];

            activities.forEach(function(activity){
                let activitydate = new Date(activity.date);
                let ndate = activitydate.getTime();

                if( MinusSevenday < ndate){
                    sevendayActivities.push(activity);
                }
            });
            localStorage.setItem('7dayActivities', JSON.stringify(sevendayActivities));
        },
        activity28day: function(){
            let activities = StorageCtrl.getActivitiesFromStorage();
            let today = new Date();
            let Minus28day = today.getTime() - 2419200000;
            let TwentyEightdayActivities = [];

            activities.forEach(function(activity){
                let activitydate = new Date(activity.date);
                let ndate = activitydate.getTime();

                if( Minus28day < ndate){
                    TwentyEightdayActivities.push(activity);
                }
            });
            localStorage.setItem('TwentyEightdayActivities', JSON.stringify(TwentyEightdayActivities));
        }

    } 
})();

// Item Controller
const ItemCtrl = (function(){
    const itemdata = {
        items: StorageCtrl.getItemsFromStorage(),
        // Dummy data
        //items: [
            //{id:0, name:'Steak Dinner', calories: 1200},
            //{id:1, name:'Cookie', calories: 400},
            //{id:2, name:'Egg', calories: 6},
        //],
        currentItem: null,
        totalCalories: 0
    }
        // Public Methods
    return{
    getItems: function(){
        return itemdata.items;
    },
    getItemIdFromName: function(inputitem){
        items = StorageCtrl.getItemsFromStorage();
        let activityItem = '';
        items.forEach(function(item){
            if(inputitem === item.name){
                activityItem = item;

            }
        });
          return activityItem;
        
        
    }
}
})();

// Activity Controller
const ActivityCtrl = (function(){
    // Activity Constructor
    const Activity = function(id, activity, date, type, calories){
        this.id = id;
        this.activity = activity;
        this.date = date;
        this.type = type;
        this.calories = calories;
    }
    // Data Structure / State
    const activitydata = {
        activities: StorageCtrl.getActivitiesFromStorage(),
        // Dummy data
        //items: [
            //{id:0, name:'Steak Dinner', calories: 1200},
            //{id:1, name:'Cookie', calories: 400},
            //{id:2, name:'Egg', calories: 6},
        //],
        currentActivity: null,
        totalCalories: 0,
        totalCaloriesBurned: 0,
        totalCaloriesGained: 0
    }

    // Public Methods
    return{
        getActivites: function(){
            return activitydata.activities;
        },
        addActivity: function(activity, date, type, calories){
        let ID;
        // Create ID
        if(activitydata.activities.length > 0){
            ID = activitydata.activities[activitydata.activities.length -1].id + 1;
        }else{
            ID = 0;
        }

        // Create new activity
        newActivity = new Activity(ID, activity, date, type, calories);
        // Add to Items Array
        activitydata.activities.push(newActivity);

        return newActivity;
        },
        getActivityById: function(id){
            let found = null;
            // loop through items
            activitydata.activities.forEach(function(activity){
                if(activity.id === id){
                    found = activity;
                }
            });
            return found;
        },
        setCurrentActivity: function(activity){
            activitydata.currentActivity = activity;
        },
        getCurrentActivity: function(){
            return activitydata.currentActivity;
        },
        updateActivity: function (inputactivity){
            activitydata.activities.forEach(function(activity){
                if(activity.id === activitydata.currentActivity.id){
                    activity.id = activity.id;
                    activity.activity = inputactivity.activity;
                    activity.date = inputactivity.date;
                    activity.type = inputactivity.type;
                    activity.calories = inputactivity.calories;
                    found = activity;
                }
            });
            return found;
            
            
        },
        deleteActivity: function(id){
            //Get ids
            const ids = activitydata.activities.map(function(activity){
                return activity.id;
            });

            // Get Index
            const index = ids.indexOf(id);

            // Remove Item
            activitydata.activities.splice(index, 1);
        },
        getTotalCaloriesBurned: function(){
            let total = 0;
            // loop through items and total
            activitydata.activities.forEach(function(activity){
                if(activity.type === 'Burn')
                total += activity.calories;
            });

            // set total cal in data structure
            activitydata.totalCaloriesBurned = total;

            // return total
            return activitydata.totalCaloriesBurned;
        },
        getTotalCaloriesGained: function(){
            let total = 0;
            // loop through items and total
            activitydata.activities.forEach(function(activity){
                if(activity.type === 'Gain')
                total += activity.calories;
            });

            // set total cal in data structure
            activitydata.totalCaloriesGained = total;

            // return total
            return activitydata.totalCaloriesGained;
        },
        getTotalCalories: function(){
            
            let burn = ActivityCtrl.getTotalCaloriesBurned();
            let gain = ActivityCtrl.getTotalCaloriesGained();
            activitydata.totalCalories = burn - gain ;

            return activitydata.totalCalories;

        },
        changeActivityTable: function(activebutton){
           
            if( '.Time-All-btn' === activebutton){

                activitydata.activities = StorageCtrl.getActivitiesFromStorage();
            }
            if( '.Time-28-btn' === activebutton){

                activitydata.activities =  StorageCtrl.get28DayActivitiesFromStorage();
            }
            if( '.Time-7-btn' === activebutton){

                activitydata.activities = StorageCtrl.get7DayActivitiesFromStorage();
            }
            if( '.Time-1-btn' === activebutton){

                activitydata.activities = StorageCtrl.getTodayActivitiesFromStorage();
            }              
         ;
        }
        


    }

})();


// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        activityList: '#activity-list',
        activityTable: '#activity-table',
        totalTable: '#total-table',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        timeAllBtn: '.Time-All-btn',
        time28Btn: '.Time-28-btn',
        time7Btn: '.Time-7-btn',
        time1Btn: '.Time-1-btn',
        activityNameInput: '#activity-name',
        activityDateInput: '#activity-date'

    }
    // Public Methods
    return {
        populateActivityPicklist: function(items){
            
            // open picklist
            let html = `<datalist id="activity">`;
            
            items.forEach(function(item){
                
                // Add picklist value for each
                html +=`
                <option id="${item.id}" value="${item.name}">
                `;    
                       
            });

            // Close picklist
            html += `</datalist>`;
            
            // locate Activity
            let activity = document.getElementById("activity-name");
            // add picklist
            activity.insertAdjacentHTML('beforeend',html);

            },        
            populateActivityList: function(activities){
                let html = ``;
     
                activities.forEach(function(activity){
                    // Add new Row for each Item
                    let tableRef = document.getElementById(UISelectors.activityTable).getElementsByTagName('tbody')[0];
                    let newRow = tableRef.insertRow(tableRef.rows.length);
                    let colour = '';
                    // work out colour based on type & give sign to calories
                    if(activity.type === 'Burn'){
                        colour = 'green';
                        calories = activity.calories;
                    }else if(activity.type === 'Gain'){
                        colour = 'red';
                        calories = activity.calories*-1;
                    }
                    // Add Data to new row for each item
                    html =`
                    <tr>
                        <td>${activity.activity}</td>
                        <td>${activity.date}</td>
                        <td style="color:${colour}">${calories}</td>
                        <td><a href="#" class="secondary-content right-align">
                        <i class="edit-item fa fa-pencil"></i></td>
                    </tr>
                    `;
                    newRow.innerHTML = html;
                    newRow.id = `activity-${activity.id}`;
                    
                });           
            },
            getActivityInput: function(){
                return {
                    activity: document.querySelector(UISelectors.activityNameInput).value,
                    date: document.querySelector(UISelectors.activityDateInput).value                    
                }
            },
            clearEditState: function(){
                UICtrl.clearInput();
                document.querySelector(UISelectors.updateBtn).style.display = 'none';
                document.querySelector(UISelectors.deleteBtn).style.display = 'none';
                document.querySelector(UISelectors.backBtn).style.display = 'none';
                document.querySelector(UISelectors.addBtn).style.display = 'inLine';
            },
            showEditState: function(){
                document.querySelector(UISelectors.updateBtn).style.display = 'inLine';
                document.querySelector(UISelectors.deleteBtn).style.display = 'inLine';
                document.querySelector(UISelectors.backBtn).style.display = 'inLine';
                document.querySelector(UISelectors.addBtn).style.display = 'none';
            },
            addListActivity: function(activity){
                // Show the list
                document.querySelector(UISelectors.activityList).style.display = 'block';
                // Create li element
                const li = document.createElement('tbody');
                // Add class
                li.className = 'collection-item';
                // Add ID
                li.id = `activity-${activity.id}`;
                // work out colour based on type & give sign to calories
                if(activity.type === 'Burn'){
                    colour = 'green';
                    calories = activity.calories;
                }else if(activity.type === 'Gain'){
                   colour = 'red';
                   calories = activity.calories*-1;
                }
                // Add HTML
                let html = `
                <tr id="${activity.id}">
                <td>${activity.activity}</td>
                <td>${activity.date}</td>
                <td style="color:${colour}">${calories}</td>
                <td><a href="#" class="secondary-content right-align">
                <i class="edit-item fa fa-pencil"></i></td>
                </tr>
                `;
                let tableRef = document.getElementById(UISelectors.activityTable).getElementsByTagName('tbody')[0];
                
                let newRow = tableRef.insertRow(tableRef.rows.length);
                newRow.id = `activity-${activity.id}`;
                newRow.innerHTML = html;
    
            },
            hideList: function(){
                document.querySelector(UISelectors.activityList).style.display = 'none';
            },
            clearInput: function(){
                document.querySelector(UISelectors.activityNameInput).value = '';
                document.querySelector(UISelectors.activityDateInput).value = '';
            },
            getSelectors: function(){
                return UISelectors;   
            },
            addActivityToForm: function(){
                document.querySelector(UISelectors.activityNameInput).value = ActivityCtrl.getCurrentActivity().activity;
                document.querySelector(UISelectors.activityDateInput).value = ActivityCtrl.getCurrentActivity().date;
                UICtrl.showEditState();
            },
            updateListActivity: function(activity){
                activityID = ActivityCtrl.getCurrentActivity().id; 
                // work out colour based on type & give sign to calories
                if(activity.type === 'Burn'){
                    colour = 'green';
                    calories = activity.calories;
                }else if(activity.type === 'Gain'){
                   colour = 'red';
                   calories = activity.calories*-1;
                } 
                document.querySelector(`#activity-${activityID}`).innerHTML = 
                `
                <tr id="${activity.id}">
                <td>${activity.activity}</td>
                <td>${activity.date}</td>
                <td style="color:${colour}">${calories}</td>
                <td><a href="#" class="secondary-content right-align">
                <i class="edit-item fa fa-pencil"></i></td>
                </tr>
            `;
            },
            deleteListActivity: function(id){
            const activityID = `#activity-${id}`;
            const activity = document.querySelector(activityID);
            activity.remove();
            },
            showTotalCalories: function(total, burned, gained){
                // work out colour of total
                if(total >= 0){
                    colour = 'green';
                }else if(total < 0){
                   colour = 'red';
                } 
                html = `
                <table>
                <th style="color:red"> Gained: ${gained}</th>
                <th style="color:green"> Burned: ${burned}</th>
                <th style="color:${colour}"> Total: ${total}</th>
                </table>
                `;
                // find total table
                let tableRef = document.getElementById(UISelectors.totalTable).getElementsByTagName('tbody')[0]
                // replace table headers with totals
                tableRef.innerHTML = html;

            },
            filterButton: function(activebutton){
                buttons = Array(
                    UISelectors.timeAllBtn,
                    UISelectors.time28Btn,
                    UISelectors.time7Btn,
                    UISelectors.time1Btn
                )
               
                buttons.forEach( function(button){
                    if(button === activebutton){
                        
                        document.querySelector(activebutton).style = 'background:green';
                    } else{
                        document.querySelector(button).style = '';
                    }
                });
            },
            resetTable: function(){
                //$("#activity-table").remove(); 
                table = document.getElementById('#activity-table');
                table.innerHTML = `
                <table id="#activity-table">
                <tr>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Calories</th>
                </tr>
                </table>`;
            }
            

        }
})();




// App Controller
const AppCtrl = (function(ItemCtrl, ActivityCtrl, StorageCtrl, UICtrl){
     // Load Event Listeners
     
     const loadEventListeners = function(){
        // get UI selectors
        const UISelectors = UICtrl.getSelectors();
        
            // Add Item event
            document.querySelector(UISelectors.addBtn).addEventListener(
            'click', activityAddSubmit);

            // Disable submit on enter
            document.addEventListener('keypress', function(e){
                if(e.keyCode === 13 | e.which === 13){
                    e.preventDefault();
                    return false;
                }
            })

            // Edit icon click event
            document.querySelector(UISelectors.activityList).addEventListener('click', activityEditClick);
            
            // item Submit
            document.querySelector(UISelectors.updateBtn).addEventListener('click', activityUpdateSubmit);
            
            // Back button event
            document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
            
            // ClearDelete button event
            document.querySelector(UISelectors.deleteBtn).addEventListener('click', activityDeleteSubmit);

            //// Time filter buttons
            // All Time
            document.querySelector(UISelectors.timeAllBtn).addEventListener('click', function() {
                filterActivities(UISelectors.timeAllBtn)});

            // 28 days
            document.querySelector(UISelectors.time28Btn).addEventListener('click', function() {
                filterActivities(UISelectors.time28Btn)});

            // 7 days
            document.querySelector(UISelectors.time7Btn).addEventListener('click', function() {
                filterActivities(UISelectors.time7Btn)});

            // Today
            document.querySelector(UISelectors.time1Btn).addEventListener('click', function() {
                filterActivities(UISelectors.time1Btn)});

             // Clear button event
             //document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
            
        }

    // Filer Activities by Date
    const filterActivities = function(button){
            
            // change the colour of buttons depending on selection
            UICtrl.filterButton(button);

            // update Activity set in the controller to be the selected table
            ActivityCtrl.changeActivityTable(button);
            
            // get activities
            let activities = ActivityCtrl.getActivites();
            
            // reset UI to blank
            UICtrl.resetTable();
            
            // update the UI using the new set
            UICtrl.populateActivityList(activities);

            // recalc total calories
            const total = ActivityCtrl.getTotalCalories();
            const totalBurned = ActivityCtrl.getTotalCaloriesBurned();
            const totalGained = ActivityCtrl.getTotalCaloriesGained();

            // refresh UI
            UICtrl.showTotalCalories(total, totalBurned, totalGained);


            
    }
    // Add Activity Submit
    const activityAddSubmit = function(e){
        
        // Get Form input from UI Controller
        const input = UICtrl.getActivityInput();
        
        // work out list id from name
        activityItem = ItemCtrl.getItemIdFromName(input.activity);
        
        // Check for name and date input
        if(input.activity !== '' && input.date !== '' ){
            // Add item 
            const newActivity = ActivityCtrl.addActivity(input.activity, input.date, activityItem.type, activityItem.calories);

            // Add item to UI list
            UICtrl.addListActivity(newActivity);            

            // Store in Local Storage
            StorageCtrl.storeActivity(newActivity);

            // update todays activities
            StorageCtrl.activityToday();

            // update Seven day activities
            StorageCtrl.activitySevenday();

            // update 28 activities
            StorageCtrl.activity28day();

            // recalc total calories
            const total = ActivityCtrl.getTotalCalories();
            const totalBurned = ActivityCtrl.getTotalCaloriesBurned();
            const totalGained = ActivityCtrl.getTotalCaloriesGained();
            
            // refresh UI
            UICtrl.showTotalCalories(total, totalBurned, totalGained);

            // Clear Fields
            UICtrl.clearInput();

        }
        e.preventDefault();
    }
    // Click edit Item
    const activityEditClick = function(e){
        if(e.target.classList.contains('edit-item')){
        // Get list activity id 
        const listId = e.target.parentNode.parentNode.parentNode.id;
          
        // Break into an array
        const listIdArr = listId.split('-');

        // Get the actual id
        const id = parseInt(listIdArr[1]);
        
        // Get Activity
        const activityToEdit = ActivityCtrl.getActivityById(id);

        // Set current Item
        ActivityCtrl.setCurrentActivity(activityToEdit);
           
        // Add Item to form
        UICtrl.addActivityToForm();

        }
        
        e.preventDefault();
    }

    // Click submit Activity
    const activityUpdateSubmit = function(e){
        // get Activity input
        const input = UICtrl.getActivityInput();
        
        
        // work out item id from name
        activityItem = ItemCtrl.getItemIdFromName(input.activity);
        input.id = ActivityCtrl.getCurrentActivity().id;
        input.type = activityItem.type;
        input.calories = activityItem.calories;

        const updatedActivity = ActivityCtrl.updateActivity(input);

        // update UI
        UICtrl.updateListActivity(updatedActivity);

        // Update Local Storage
        StorageCtrl.updateActivityStorage(updatedActivity);

        // update todays activities
        StorageCtrl.activityToday();

        // update Seven day activities
        StorageCtrl.activitySevenday();

        // update 28 activities
        StorageCtrl.activity28day();

        // recalc total calories
        const total = ActivityCtrl.getTotalCalories();
        const totalBurned = ActivityCtrl.getTotalCaloriesBurned();
        const totalGained = ActivityCtrl.getTotalCaloriesGained();

        // refresh UI
        UICtrl.showTotalCalories(total, totalBurned, totalGained);

        // clear edit state
        UICtrl.clearEditState();
        
        e.preventDefault();
    }

    // Activity Delete
    const activityDeleteSubmit = function(e){
         // get Current Activity
        const currentActivity = ActivityCtrl.getCurrentActivity();

        // Delete from data structure
        ActivityCtrl.deleteActivity(currentActivity.id);
        
        // Delete from UI
        UICtrl.deleteListActivity(currentActivity.id);
        
        // Delete from Local storage
        StorageCtrl.deleteActivityFromStorage(currentActivity.id);
        
        // update todays activities
        StorageCtrl.activityToday();

        // update Seven day activities
        StorageCtrl.activitySevenday();

        // update 28 activities
        StorageCtrl.activity28day();

        // clear edit state
         UICtrl.clearEditState();

        e.preventDefault();
    }



    // Public methods 
    return {
        init: function(){
            // get items list from storage
            items = StorageCtrl.getItemsFromStorage();
            
            // update todays activities
            StorageCtrl.activityToday();

            // update Seven day activities
            StorageCtrl.activitySevenday();

            // update 28 activities
            StorageCtrl.activity28day();
            
            // send items list to picklist
            UICtrl.populateActivityPicklist(items);

            // Clear edit state / set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const activities = ActivityCtrl.getActivites();
            // Check if any items
            if(activities.length === 0){
                UICtrl.hideList();
            } else {
                // Populate list with items
            UICtrl.populateActivityList(activities);
            }

            // recalc total calories
            const total = ActivityCtrl.getTotalCalories();
            const totalBurned = ActivityCtrl.getTotalCaloriesBurned();
            const totalGained = ActivityCtrl.getTotalCaloriesGained();
            
            // refresh UI
            UICtrl.showTotalCalories(total, totalBurned, totalGained);
            
            // Load event listeners
            loadEventListeners(); 

        }
    }
})(ItemCtrl, ActivityCtrl, StorageCtrl, UICtrl);

AppCtrl.init();

