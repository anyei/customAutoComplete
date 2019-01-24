({
    doInit:function(component, event, helper){
       
    },
    validateThisComponent:function(component, event, helper){
            helper.validateThisComponent(component, event, helper);
    },
    clearValue : function(component, event, helper) {
        component.set('v.value',null);
    },
    doSearch:function(component, event, helper){ 
        if(!helper.hasClass("trigger-container","slds-is-open",component, event, helper)) 
            helper.toggleContainersVisualMode("trigger-container","slds-is-open",component, event, helper);
      
        component.set('v.searchInProgress',true);
        var query = helper.generateQuery(event.target.value,component, event, helper);
        helper.runQuery(query,component, event, helper, function(rawResults, component,event, helper){
            var results = helper.transformSObjectToResults(rawResults,component, event, helper);
            component.set('v.results',results);
            component.set('v.searchInProgress',false);
        });
        
    },
    itemSelected:function(component, event, helper){        
        var selectedValue = event.getParam('args').value;
        var onItemSelected = component.get('v.onItemSelected');
        console.log('item selected running action');
     
        component.set('v.value', selectedValue);
        if(helper.hasClass("trigger-container","slds-is-open",component, event, helper)) 
            helper.toggleContainersVisualMode("trigger-container","slds-is-open",component, event, helper);
        
        helper.validateThisComponent(component, event, helper);
    },
    closeList:function(component,event,helper){
        
        if(helper.hasClass("trigger-container","slds-is-open",component, event, helper) && !component.get('v.insideItemList')) 
        {
            helper.toggleContainersVisualMode("trigger-container","slds-is-open",component, event, helper); 
             component.set('v.value',null);
        }
        
        helper.validateThisComponent(component, event, helper);
    },
    insideItemList:function(component, event, helper){
        component.set('v.insideItemList', true);
    },
    leavedItemList:function(component, event, helper){
        component.set('v.insideItemList',false);
    },
    onItemSelectedDummy:function(component, event, helper){
        
    }
})