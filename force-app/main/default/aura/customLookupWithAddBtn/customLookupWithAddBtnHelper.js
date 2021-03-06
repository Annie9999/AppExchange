({
	searchHelper : function(component,event,getInputkeyWord) {
	  // call the apex class method 
     var action = component.get("c.fetchLookUpValues");
     console.log('search helper action : '+action);
      // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord,
            'ObjectName' : component.get("v.objectAPIName"),
            'nameField' : component.get("v.nameField"),
            'condition' : component.get("v.condition"),
            'extraField' :'',
            'extraSearchField' : '',
            'customNameField' : component.get("v.customNameField"),
            'hasLastViewedDate' : component.get("v.hasLastViewedDate"),
            'isSortNameField' : component.get("v.isSortNameField")
          });
      // set a callBack    
        action.setCallback(this, function(response) {
          $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            console.log(state+ '<< serachHeler');
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                console.log('storeResponse : '+storeResponse);
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Result Found...');
                } else {
                    component.set("v.Message", '');
                }
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
  },
  
  // test by kevin to get sales name by project


  // kevin test end here
})