import {customElement, bindable, bindingMode, inject} from "aurelia-framework";

@customElement('my-input')
@inject(Element)
export class MyInput {
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    bind(bindingContext) {
        this.bindingContext = bindingContext;
        this.schema = this.bindingContext.element.attributes;
    }
}
