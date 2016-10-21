import {customElement, bindable, bindingMode, inject} from "aurelia-framework";

@customElement('my-dropdown')
@inject(Element)
export class MyDropdown {
    @bindable value;

    constructor(element) {
        this.element = element;
    }

    bind(bindingContext) {
        this.bindingContext = bindingContext;
        this.schema = this.bindingContext.element.attributes;
        this.options = this.bindingContext.element.attributes.options;
    }

    onSelect(){

        switch (parseInt(this.value)) {
            case 1:
                this.bindingContext.parent.elements = this.bindingContext.parent.viewOneElements;
                break;
            case 2:
                this.bindingContext.parent.elements = this.bindingContext.parent.viewTwoElements;
                break;
        }

    }
}
