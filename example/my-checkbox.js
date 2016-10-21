import {customElement, bindable, bindingMode, inject} from "aurelia-framework";

@customElement('my-checkbox')
@inject(Element)
export class MyCheckbox {
    @bindable name;
    @bindable value = [];

    constructor(element) {
        this.element = element;
    }

    bind(bindingContext) {
        this.bindingContext = bindingContext;
        this.schema = this.bindingContext.element.attributes;
        this.options = this.bindingContext.element.attributes.options;
    }
}
