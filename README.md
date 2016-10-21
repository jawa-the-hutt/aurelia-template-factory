# Aurelia Template Factory
A free template factory component for your Aurelia applications. Allows you to dynamically assemble multiple templates into a view by reading in an object array of the elements you wish to have show in your view.  It essentially allows you to maintain one master view/view-model if you wish that you can dynamically load elements into.

## Installation
1. In your console type: ``npm install aurelia-template-factory --save``
2. During the bootstrapping phase, register the plugin:
```
export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-template-factory')
    .developmentLogging();

  aurelia.start().then(a => a.setRoot());
}
```

## Usage
This plugin has only one view-model to it that has multiple bindings:
*	parent -- this is an optional binding that is meant to allow you to bind the parent view-model to the Template Factory so that ultimately, you can acceess it from the templated component.
*	keyString  -- this is a required binding that allows you to customize the string the plugin will use to identify the element binding's property that will be used to setup correct bindings.
*	optionString -- this is a required binding that allows you to customize the string the plugin will use to identify the object array that contains data options for things like radios, checkboxes, selects, etc.
*	attributesObjectString -- this is a required binding that allows you to customize the string the plugin will use to identify the object used to describe the component's attributes.
*	element -- this is a required binding and it is an object that describes your templated component.
*	value -- this is an optional binding that could be used to pass the value of the templated component up and down the tree.
*	data -- This is unused at the moment.

The actual shape and parts that make up your element object are largely up to you.  With the `keyString`, `optionString` & `attributesObjectString` bindings, you have flexibility in how you setup the object.  The only required properties in this object are the `htmlElementType` and `htmlElementAlias`.  The goal of these two properties is to allow  you to have the option of inserting a standard HTML element based on your entry for `htmlElementType` or if you have a custom component, you can also fill in `htmlElementAlias`.

** In the current version of the plugin it's not setup to allow the standard HTML component to have it's html attributes set.  That will come in a future update.

### template-factory
The template-factory component is where you will setup the options and bindings for the templated component.  To use the plugin you can create a view/view-model as below:

**In your View:**
```
<div repeat.for="element of elements">
    <template-factory parent.bind="thisVM"
                      element.bind="element"
                      key-String.bind="keyString"
                      option-String.bind="optionString"
                      attributes-Object-String.bind="attributesObjectString"
                      >
    </template-factory>
</div>
```

**In your ViewModel**:
```
export class ViewModel {
    constructor() {
	    this.thisVM = this;
        this.keyString = 'key';
        this.optionString = 'options';
        this.attributesObjectString = 'attributes';

        this.elements = [
            {
                'htmlElementType': 'input',
                'htmlElementAlias': 'my-input',
                'attributes': {
                    'key': 'name',
                    'labelText': 'Name',
                    'type': 'text',
                    'placeholder': 'Enter a Name...',
                    'class': 'form-control',
                    'value.bind': 'name'
                }
            },
            {
                'htmlElementType': 'radio',
                'htmlElementAlias': 'my-radio',
                'attributes': {
                    'key': 'gender',
                    'labelText': 'Gender',
                    'formGroupLabelClass': 'control-label',
                    'optionInputClass': '',
                    'optionLabelClass': '',
                    'options': [
                        {
                            'id': 'male',
                            'value': 'M',
                            'text': 'Male'
                        },
                        {
                            'id': 'female',
                            'value': 'F',
                            'text': 'Female'
                        }
                    ],
                    'value.bind': 'gender'
                }
            }
        ]
    }
}
```

Take a look at the `dyanmic-view` view-model and custom components in the Example folder to see how this could work.  While not in this example, it is entirely possible to make a call to a data source that will bring in a `elements` object based of the currently loaded route.  This would involve using the `aurelia-event-aggregator` plugin and then subscribing to the router's navigation success event and then parsing its response.

** Example of this:
```
activate(params, navigationInstruction) {
    this.subscription = this.eventAggregator.subscribe('router:navigation:success', response => {
        this.loadViewConfiguration(params, response.instruction.fragment.slice(1));  // custom function to go get the data from the data source.
    });
}
```