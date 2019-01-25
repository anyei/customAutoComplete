# customAutoComplete
sfdc lightning component, autocomplete to search any object you may want to do soql on.

### demo

![demo](https://github.com/anyei/customAutoComplete/raw/master/customAutoComplete-Demo.gif)



### simple example 1
This will search in the US_States__mdt custom metadata settings object and will use the value in the labelField attribute as the condition field.

##### markup
```html
<c:customAutoComplete  valueField="Label" labelField="Label" targetObject="US_States__mdt" aura:id="stateAutoC"  label="States"  />
```



### simple example 2
We get the selected record when clicking the button.

##### markup
```html
<c:customAutoComplete  valueField="Label" labelField="Label" targetObject="US_States__mdt" aura:id="stateAutoC"  label="States"  />

<lightning:button label="submit" variant="brand" onclick="{!c.buttonClick}" />
```

##### js controller
```javascript
({
	buttonClick : function(component, event, helper) {
        var selectedRecord = component.find('stateAutoC').get('v.value');
        console.log(selectedRecord.value + ' ' + selectedRecord.label);
	}
})

```

### simple example 3 onItemSelected
Handling the onItemSelected event just by setting the onItemSelected attribute. See the following code snipe.

##### markup
```html
<c:customAutoComplete  valueField="Label" labelField="Label" targetObject="US_States__mdt" aura:id="stateAutoC"  label="States" onItemSelected="{!c.itemSelected}" />

<lightning:button label="submit" variant="brand" onclick="{!c.buttonClick}" />
```

##### js controller
```javascript
({
	itemSelected : function(component, event, helper) {
        var selectedRecord = event.getParam('args').value;
        
        console.log("item selected !!!!!");
		    console.log(selectedRecord.value + ' ' + selectedRecord.label);
        
        //recommended to stop the propagation if no need to let it go up in the event hierarchy
        event.stopPropagation();
	}
})

```


### simple example 4 as required
Using required attribute.

##### markup
```html
<c:customAutoComplete  valueField="Label" labelField="Label" targetObject="US_States__mdt" aura:id="stateAutoC"  label="States"  required="true" />

<lightning:button label="submit" variant="brand" onclick="{!c.buttonClick}" />
```

##### js controller
```javascript
({
	buttonClick : function(component, event, helper) {
        
        //checking if the component has been populated propertly
        var stateAutocomplete = component.find('stateAutoC');        
        stateAutocomplete.showHelpMessageIfInvalid();
        
        if(stateAutocomplete.get('v.validity').valid){
            var selectedRecord = stateAutocomplete.get('v.value');
        	console.log(selectedRecord.value + ' ' + selectedRecord.label);
        }
        
	}
})

```



### simple example 5 as required along with other lightning components
Using other required lightning components and validating everything at once.

##### markup
```html
<c:customAutoComplete  valueField="Label" labelField="Label" targetObject="US_States__mdt" aura:id="stateAutoC"  label="States"  required="true" />

 <lightning:input type="text" aura:id="input1" required="true" label="test 1" />
 <lightning:input type="text" aura:id="input2" required="true" label="test 2" />
 <lightning:input type="text" aura:id="input3" required="true" label="test 3" />
<lightning:button label="submit" variant="brand" onclick="{!c.buttonClick}" />
```

##### js controller
```javascript
({
	buttonClick : function(component, event, helper) {
        
        //checking if the component has been populated propertly
       var fieldsToValidate = ['stateAutoC', 'input1', 'input2', 'input3'];
        var allValid = helper.validateFields(fieldsToValidate, component);
        
        if(allValid){
            var selectedRecord = stateAutocomplete.get('v.value');
        	console.log(selectedRecord.value + ' ' + selectedRecord.label);
        }
        
	}
})

```

##### js helper
```javascript
({
	validateFields : function(fieldsToValidate, component) {
        var allValid = true;
       
		for(var i =0;i<fieldsToValidate.length;i++){
            var fname = fieldsToValidate[i];          
            var fcmp = component.find(fname);
        	fcmp.showHelpMessageIfInvalid();
            allValid = allValid && fcmp.get('v.validity').valid
        }
        
        return allValid;
	}
})

```

