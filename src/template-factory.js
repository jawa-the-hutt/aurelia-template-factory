import {inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable} from 'aurelia-framework';

@noView
@inject(ViewCompiler, ViewSlot, Container, ViewResources)
export class TemplateFactory {

    @bindable parent;
    @bindable keyString;
    @bindable optionString;
    @bindable attributesObjectString;
    @bindable element;
    @bindable value;
    @bindable data;

    constructor(viewCompiler, viewSlot, container, viewResources) {
        this.viewCompiler = viewCompiler;
        this.viewSlot = viewSlot;
        this.container = container;
        this.viewResources = viewResources;
    }

    attached() {
        let self = this;

        // Compile an html template, dom fragment or string into ViewFactory instance, capable of instantiating Views.
        var viewFactory = self.viewCompiler.compile(self.create(self.element, self.parent, self.value), self.viewResources);

        // Creates a view or returns one from the internal cache, if available
        var view = viewFactory.create(self.container);

        // Bind the view and it's children
        view.bind(self);

        // Add the view to the slot
        self.viewSlot.add(view);

        // Trigger the attach for the slot and its children.
        self.viewSlot.attached();
    }

    create(element, model, value) {

        let templateStart = '<template>';
        let templateEnd = '</template>';
        let html = templateStart;
        let attributes = element[this.attributesObjectString];
        let key = attributes[this.keyString];

        // create the HTML element with the necessary tags
        let createdElement = element.htmlElementAlias ? document.createElement(element.htmlElementAlias) : element.htmlElementType;

        // When dealing with repeatable elements, we have to track specific indexes in the repeatable element array
        // so that we bind to the correct value attribute position so that when we save or load data, we are able to 
        // pass the correct location in the array back up the data tree.
        if (value != null && value != 'undefined' && value != '') {
            if (typeof value == 'object') {
                let valString = '';
                let typeOfValueBind = '';

                // if true, we have a value binding of some kind
                if (Object.keys(attributes).some((k) => ~k.indexOf("value."))) {
                    // get the type of value binding:  .bind, .two-way, .one-way, etc...
                    typeOfValueBind = Object.keys(attributes).filter((k) => ~k.indexOf("value."))[0];

                    // if true, we're using the Aurelia Validation Plugin
                    // Note: as of 10/20/2016 the Validation plugin has problems with 
                    // the tracking objects that may have null data in them.
                    if (element.attributes[typeOfValueBind].endsWith('validate')) {
                        valString = ' & validate';
                    }
                }

                // allows us to bind the value property to an object and then nest as necessary
                let binding = 'value.' + key + valString;

                for (let attribute in attributes) {
                    // this essentially works for checkboxes and radio's to change
                    // the option.id for each repeatable item that shows up in the DOM
                    if (attribute == this.optionString) {
                        let options = [];
                        if (attributes[attribute] != null && attributes[attribute] != 'undefined' && attributes[attribute] != '') {
                            for (let option of attributes[attribute]) {
                                if (option.hasOwnProperty('id')) {
                                    option.id = binding + '.' + option.value;
                                }
                                options.push(option);
                            }

                            attributes[attribute] = options;
                            createdElement.setAttribute('name', binding);
                        }
                    }
                }

                createdElement.setAttribute(typeOfValueBind, binding);
            }


        } else {
            // set the binding attributes for the custom element
            for (let attribute in attributes) {
                if (attribute.startsWith('value.')) {
                    createdElement.setAttribute(attribute, attributes[attribute]);
                };

                // this essentially works for checkboxes and radio's to change
                // the option.id for each repeatable item that shows up in the DOM
                if (attribute == this.optionString) {
                    let options = [];
                    if (attributes[attribute] != null && attributes[attribute] != 'undefined' && attributes[attribute] != '') {
                        for (let option of attributes[attribute]) {
                            if (option.hasOwnProperty('id')) {
                                option.id = key + '.' + option.value;
                            }
                            options.push(option);
                        }
                        attributes[attribute] = options;
                        createdElement.setAttribute('name', key);
                    }
                }
            }
        }

        // add the elements html into the string
        html += createdElement.outerHTML;

        // close out the string with </template>
        html += templateEnd;

        return html;
    }
}
