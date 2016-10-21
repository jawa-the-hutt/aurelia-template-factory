var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
        enumerable: descriptor.enumerable,
        configurable: descriptor.configurable,
        writable: descriptor.writable,
        value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
}

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
        desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
        desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
        return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
        desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
        desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
        Object['define' + 'Property'](target, property, desc);
        desc = null;
    }

    return desc;
}

function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
}

import { inject, noView, ViewCompiler, ViewSlot, Container, ViewResources, bindable } from 'aurelia-framework';

export let TemplateFactory = (_dec = inject(ViewCompiler, ViewSlot, Container, ViewResources), noView(_class = _dec(_class = (_class2 = class TemplateFactory {

    constructor(viewCompiler, viewSlot, container, viewResources) {
        _initDefineProp(this, 'parent', _descriptor, this);

        _initDefineProp(this, 'keyString', _descriptor2, this);

        _initDefineProp(this, 'optionString', _descriptor3, this);

        _initDefineProp(this, 'attributesObjectString', _descriptor4, this);

        _initDefineProp(this, 'element', _descriptor5, this);

        _initDefineProp(this, 'value', _descriptor6, this);

        _initDefineProp(this, 'data', _descriptor7, this);

        this.viewCompiler = viewCompiler;
        this.viewSlot = viewSlot;
        this.container = container;
        this.viewResources = viewResources;
    }

    attached() {
        let self = this;

        var viewFactory = self.viewCompiler.compile(self.create(self.element, self.parent, self.value), self.viewResources);

        var view = viewFactory.create(self.container);

        view.bind(self);

        self.viewSlot.add(view);

        self.viewSlot.attached();
    }

    create(element, model, value) {

        let templateStart = '<template>';
        let templateEnd = '</template>';
        let html = templateStart;
        let attributes = element[this.attributesObjectString];
        let key = attributes[this.keyString];

        let createdElement = element.htmlElementAlias ? document.createElement(element.htmlElementAlias) : element.htmlElementType;

        if (value != null && value != 'undefined' && value != '') {
            if (typeof value == 'object') {
                let valString = '';
                let typeOfValueBind = '';

                if (Object.keys(attributes).some(k => ~k.indexOf("value."))) {
                    typeOfValueBind = Object.keys(attributes).filter(k => ~k.indexOf("value."))[0];

                    if (element.attributes[typeOfValueBind].endsWith('validate')) {
                        valString = ' & validate';
                    }
                }

                let binding = 'value[' + (value.length - 1) + '].' + key + valString;

                for (let attribute in attributes) {
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
            for (let attribute in attributes) {
                if (attribute.startsWith('value.')) {
                    createdElement.setAttribute(attribute, attributes[attribute]);
                };

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

        html += createdElement.outerHTML;

        html += templateEnd;

        return html;
    }

}, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'parent', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'keyString', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'optionString', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'attributesObjectString', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'element', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'value', [bindable], {
    enumerable: true,
    initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'data', [bindable], {
    enumerable: true,
    initializer: null
})), _class2)) || _class) || _class);