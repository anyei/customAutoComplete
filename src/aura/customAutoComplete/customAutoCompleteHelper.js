({
    toggleContainersVisualMode : function(componentName,className, component, event, helper) {		     
        $A.util.toggleClass(component.find(componentName), className);
    },
    hasClass:function(componentName,className, component, event, helper){
        
        return $A.util.hasClass(component.find(componentName), className);
    },
    transformSObjectToResults:function(sobjects,component, event, helper){
        var results = []
        if(sobjects != null && sobjects != undefined){
            if(helper.isArray(sobjects)){
                for(var i =0;i<sobjects.length;i++){
                    var aRecord = sobjects[i];
                    
                    if(aRecord.hasOwnProperty(component.get('v.labelField')) && aRecord.hasOwnProperty(component.get('v.valueField'))){
                        results.push({label:aRecord[component.get('v.labelField')], value:aRecord[component.get('v.valueField')]});
                    }
                }
            }
        } 
        return results;
    },
    isArray:function(obj){
      return Object.prototype.toString.call(obj) === '[object Array]';  
    },
    generateQuery:function(q,component, event, helper){
        var customWhere = component.get('v.customCondition');
        var customLimit = component.get('v.itemLimit');
        var labelField = component.get('v.labelField');
        var valueField = component.get('v.valueField');
     
        var query = 'select '+labelField + (labelField != null && labelField != undefined && labelField.includes(valueField) ? '' : ','+valueField)+' from '+
            component.get('v.targetObject')+ ' where '+ component.get('v.labelField')+ " like '%"+q+"%'" + (customWhere != null && customWhere != undefined ? ' and '+ customWhere : '');
        query += ' limit ' +(customLimit != null && customLimit != undefined ? customLimit : '7');
       return query;
    },
    generateRecordByIdQuery:function(idValue, component, event, helper){
        var labelField = component.get('v.labelField');
        var valueField = component.get('v.valueField');
      var query = 'select '+ labelField + ' , '+ valueField + ' from ' + component.get('v.targetObject') +" where Id ='"+ idValue+"'";
       return query; 
    },
    runQuery:function(query,component, event, helper, callback){
        // create a one-time use instance of the serverEcho action
        // in the server-side controller
       
        var action = component.get("c.filter");
        action.setParams({ q:query });
        
        // Create a callback that is executed after 
        // the server-side action returns
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               //if you only want to invoke action when success
            }
            else if (state === "INCOMPLETE") {
                // do something
                console.log('weird error, incomplete??? ');
            }  else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            //component.set('v.loadingDataError', errors[0].message);
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        //component.set('v.loadingDataError', errors[0].message);
                        console.log("Unknown error");
                    }
                }
            
             if(typeof(callback) =='function') callback(response.getReturnValue(), component, event, helper);
        });
        
        // optionally set storable, abortable, background flag here
        
        // A client-side action could cause multiple events, 
        // which could trigger other events and 
        // other server-side action calls.
        // $A.enqueueAction adds the server-side action to the queue.
        $A.enqueueAction(action);
    },
    validateThisComponent:function(component, event, helper){
        component.set('v.validity', {valid:true});
        component.set('v.hasErrors', component.get('v.validity').valid != true);
        if(component.get('v.required'))
        {
            component.set('v.validity', {valid:(  component.get('v.value') != null && component.get('v.value') != undefined)});
            component.set('v.hasErrors', component.get('v.validity').valid != true);
        }
        
    }
})