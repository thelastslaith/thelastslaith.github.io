// Storage Controller
const StorageCtrl = (function(){
    return {
        // public methods
        storeItem: function(item){
            let items = [];

            // check local storage for items
            if(localStorage.getItem('items') === null){
                items = [];
                // push new Item
                items.push(item);
                // set local storage
                localStorage.setItem('items',JSON.stringify(items));
            }else{
                // Get Items from Local storage
                items = JSON.parse(localStorage.getItem('items'));
                // Push new Item
                items.push(item);

                // update Local storage
                localStorage.setItem('items', JSON.stringify(items));
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
        updateItemStorage: function(updatedItem){
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item, index){
                if(updatedItem.id === item.id){
                    items.splice(index, 1, updatedItem);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id){
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach(function(item, index){
                if(id === item.id){
                    items.splice(index, 1);
                }
            });
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function(){
            localStorage.removeItem('items');
        }
    }

})();


// Item Controller
const ItemCtrl = (function(){
    // Item Constructor
    const Item = function(id, name, calories, type){
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.type = type;
    }

    // Data Structure / State
    const data = {
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
            return data.items;
        },
        addItem: function(name, calories, type){
            
            let ID;
            // Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length -1].id + 1;
            }else{
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories, type);
            // Add to Items Array
            data.items.push(newItem);

            return newItem;
        },
        getItemById: function(id){
            let found = null;
            // loop through items
            data.items.forEach(function(item){
                if(item.id === id){
                    found = item;
                }
            });
            return found;
        },
        updateItem: function(name, calories, type){
            // Calories to number
            calories = parseInt(calories);
            let found = null;

            data.items.forEach(function(item){
                if(item.id === data.currentItem.id){
                    item.name = name;
                    item.calories = calories;
                    item.type = type;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id){
            //Get ids
            const ids = data.items.map(function(item){
                return item.id;
            });

            // Get Index
            const index = ids.indexOf(id);

            // Remove Item
            data.items.splice(index, 1);
        },
        clearAllItems: function(){
            data.items = [];
        },
        setCurrentItem: function(item){
            data.currentItem = item;
        },
        getCurrentItem: function(){
            return data.currentItem;
        },
        getTotalCalories: function(){
            let total = 0;
            // loop through items and total
            data.items.forEach(function(item){
                total += item.calories;
            });

            // set total cal in data structure
            data.totalCalories = total;

            // return total
            return data.totalCalories;
        },
        logData: function(){
            return data;
        }
    }


})();


// UI Controller
const UICtrl = (function(){

    const UISelectors = {
        itemList: '#item-list',
        itemTable: '#item-table',
        Tableitems: '#item-table table',
        listItems: '#item-list tbody',
        addBtn: '.add-btn',
        updateBtn: '.update-btn',
        deleteBtn: '.delete-btn',
        backBtn: '.back-btn',
        clearBtn: '.clear-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        itemTypeInput: '#item-type',
        totalCalories: '.total-calories'
    }

    // Public Methods
    return {
        populateItemList: function(items){
            let html = ``;
 
            items.forEach(function(item){
                // Add new Row for each Item
                let tableRef = document.getElementById(UISelectors.itemTable).getElementsByTagName('tbody')[0];
                let newRow = tableRef.insertRow(tableRef.rows.length);
                if(item.type === 'Burn'){
                    colour = 'green';
                    calories = item.calories;
                }else if(item.type === 'Gain'){
                    colour = 'red';
                    calories = item.calories*-1;
                    } 
                // Add Data to new row for each item
                html =`
                <tr>
                    <td>${item.name}</td>
                    <td style="color:${colour}">${item.calories}</td>
                    <td>${item.type}</td>
                    <td><a href="#" class="secondary-content right-align">
                    <i class="edit-item fa fa-pencil"></i></td>
                </tr>
                `;
                newRow.innerHTML = html;
                newRow.id = `item-${item.id}`;
            });
            
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
                type: document.querySelector(UISelectors.itemTypeInput).value
                
            }
        },
        addListItem: function(item){
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('tbody');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // work out colour based on type & give sign to calories
            if(item.type === 'Burn'){
                colour = 'green';
                calories = item.calories;
            }else if(item.type === 'Gain'){
                colour = 'red';
                calories = item.calories*-1;
                } 
            // Add HTML
            let html = `
            <tr id="${item.id}">
            <td>${item.name}</td>
            <td style="color:${colour}">${item.calories}</td>
            <td>${item.type}</td>
            <td><a href="#" class="secondary-content right-align">
            <i class="edit-item fa fa-pencil"></i></td>
            </tr>
            `;
            let tableRef = document.getElementById(UISelectors.itemTable).getElementsByTagName('tbody')[0];
            
            let newRow = tableRef.insertRow(tableRef.rows.length);
            newRow.id = `item-${item.id}`;
            newRow.innerHTML = html;

        },
        clearInput: function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
            document.querySelector(UISelectors.itemTypeInput).value = '';
        },
        updateListItem: function(item){
            itemID = ItemCtrl.getCurrentItem().id;   
   
            // work out colour based on type & give sign to calories
            if(item.type === 'Burn'){
                colour = 'green';
                calories = item.calories;
            }else if(item.type === 'Gain'){
                colour = 'red';
                calories = item.calories*-1;
                } 
            document.querySelector(`#item-${itemID}`).innerHTML = 
            `
            <tr id="${item.id}">
            <td>${item.name}</td>
            <td style="color:${colour}">${item.calories}</td>
            <td>${item.type}</td>
            <td><a href="#" class="secondary-content right-align">
            <i class="edit-item fa fa-pencil"></i></td>
            </tr>
        `;
        },
        removeItems: function(){
            let listItems = document.querySelectorAll(UISelectors.listItems);

            // Turn node list into Array
            listItems = Array.from(listItems);

            listItems.forEach(function(item){
                item.remove();
            })
            
        },
        deleteListItem: function(id){
            const itemID = `#item-${id}`;
            const item = document.querySelector(itemID);
            item.remove();
        },
        addItemToForm: function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;
            document.querySelector(UISelectors.itemTypeInput).value = ItemCtrl.getCurrentItem().type;
            UICtrl.showEditState();
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalCalories: function(totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
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
        getSelectors: function(){
            return UISelectors;   
        }
    }
})();


// App Controller
const AppCtrl = (function(ItemCtrl, StorageCtrl, UICtrl){
    // Load Event Listeners
    const loadEventListeners = function(){
        // get UI selectors
        const UISelectors = UICtrl.getSelectors();
    
            // Add Item event
            document.querySelector(UISelectors.addBtn).addEventListener(
            'click', itemAddSubmit);

            // Disable submit on enter
            document.addEventListener('keypress', function(e){
                if(e.keyCode === 13 | e.which === 13){
                    e.preventDefault();
                    return false;
                }
            })

            // Edit icon click event
            document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
            
            // item Submit
            document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
            
            // Back button event
            document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);
            
            // ClearDelete button event
            document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
            
             // Clear button event
             document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllItemsClick);
            
        }

    // Add Item submit
    const itemAddSubmit = function(e){
        // Get Form input from UI Controller
        const input = UICtrl.getItemInput();
        
        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '' && input.type !==''){

            // Add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories, input.type);
            // Add item to UI list
            UICtrl.addListItem(newItem);
            
            // get total calories
            //const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            //UICtrl.showTotalCalories(totalCalories);

            // Store in Local Storage
            StorageCtrl.storeItem(newItem);

            // Clear Fields
            UICtrl.clearInput();

        }
        e.preventDefault();
    }

    // Click edit Item
    const itemEditClick = function(e){

        if(e.target.classList.contains('edit-item')){
          // Get list item id 
          const listId = e.target.parentNode.parentNode.parentNode.id;

          // Break into an array
          const listIdArr = listId.split('-');

          // Get the actual id
          const id = parseInt(listIdArr[1]);
          
           // Get Item
           const itemToEdit = ItemCtrl.getItemById(id);

           // Set current Item
           ItemCtrl.setCurrentItem(itemToEdit);

           // Add Item to form
           UICtrl.addItemToForm();
        }
        
        e.preventDefault();
    }

    // Item Update Submit
    const itemUpdateSubmit = function(e){
        // get Item input
        const input = UICtrl.getItemInput();

        // Update Item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories, input.type);
        
        // update UI
        UICtrl.updateListItem(updatedItem);
        
        // get total calories
        //const totalCalories = ItemCtrl.getTotalCalories();
        
        // Update Local Storage
        StorageCtrl.updateItemStorage(updatedItem);

         // Add total calories to UI
        // UICtrl.showTotalCalories(totalCalories);
       
        // clear edit state
         UICtrl.clearEditState();

        e.preventDefault();
    }

    // Delete Button
    const itemDeleteSubmit = function(e){
        // get Current Item
        const currentItem = ItemCtrl.getCurrentItem();

        // Delete from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // Delete from UI
        UICtrl.deleteListItem(currentItem.id);

        // get total calories
        //const totalCalories = ItemCtrl.getTotalCalories();

         // Add total calories to UI
         //UICtrl.showTotalCalories(totalCalories);
              
         // Delete from Local storage
         StorageCtrl.deleteItemFromStorage(currentItem.id);

         // clear edit state
         UICtrl.clearEditState();

        e.preventDefault();
    }

    // Clear Items event
    const clearAllItemsClick = function(){
        // Delete all items from data structure
        ItemCtrl.clearAllItems();

        // get total calories
        //const totalCalories = ItemCtrl.getTotalCalories();
        // Add total calories to UI
        //UICtrl.showTotalCalories(totalCalories);
        // Clear Fields
        UICtrl.clearInput();
        // Remove from UI
        UICtrl.removeItems();
        // Clear from Local storage
        StorageCtrl.clearItemsFromStorage();
        // Hide UI
        UICtrl.hideList();
    }

    // Public methods 
    return {
        init: function(){

            // Clear edit state / set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0){
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            // get total calories
            //const totalCalories = ItemCtrl.getTotalCalories();
            // Add total calories to UI
            //UICtrl.showTotalCalories(totalCalories);
           

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

AppCtrl.init();