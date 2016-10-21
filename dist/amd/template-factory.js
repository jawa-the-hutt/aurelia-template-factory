define(['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.TemplateFactory = undefined;

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
    } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
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

    var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7;

    var TemplateFactory = exports.TemplateFactory = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.ViewCompiler, _aureliaFramework.ViewSlot, _aureliaFramework.Container, _aureliaFramework.ViewResources), (0, _aureliaFramework.noView)(_class = _dec(_class = (_class2 = function () {
        function TemplateFactory(viewCompiler, viewSlot, container, viewResources) {
            _classCallCheck(this, TemplateFactory);

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

        TemplateFactory.prototype.attached = function attached() {
            var self = this;

            var viewFactory = self.viewCompiler.compile(self.create(self.element, self.parent, self.value), self.viewResources);

            var view = viewFactory.create(self.container);

            view.bind(self);

            self.viewSlot.add(view);

            self.viewSlot.attached();
        };

        TemplateFactory.prototype.create = function create(element, model, value) {

            var templateStart = '<template>';
            var templateEnd = '</template>';
            var html = templateStart;
            var attributes = element[this.attributesObjectString];
            var key = attributes[this.keyString];

            var createdElement = element.htmlElementAlias ? document.createElement(element.htmlElementAlias) : element.htmlElementType;

            if (value != null && value != 'undefined' && value != '') {
                if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
                    var valString = '';
                    var typeOfValueBind = '';

                    if (Object.keys(attributes).some(function (k) {
                        return ~k.indexOf("value.");
                    })) {
                        typeOfValueBind = Object.keys(attributes).filter(function (k) {
                            return ~k.indexOf("value.");
                        })[0];

                        if (element.attributes[typeOfValueBind].endsWith('validate')) {
                            valString = ' & validate';
                        }
                    }

                    var binding = 'value[' + (value.length - 1) + '].' + key + valString;

                    for (var attribute in attributes) {
                        if (attribute == this.optionString) {
                            var options = [];
                            if (attributes[attribute] != null && attributes[attribute] != 'undefined' && attributes[attribute] != '') {
                                for (var _iterator = attributes[attribute], _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                                    var _ref;

                                    if (_isArray) {
                                        if (_i >= _iterator.length) break;
                                        _ref = _iterator[_i++];
                                    } else {
                                        _i = _iterator.next();
                                        if (_i.done) break;
                                        _ref = _i.value;
                                    }

                                    var option = _ref;

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
                for (var _attribute in attributes) {
                    if (_attribute.startsWith('value.')) {
                        createdElement.setAttribute(_attribute, attributes[_attribute]);
                    };

                    if (_attribute == this.optionString) {
                        var _options = [];
                        if (attributes[_attribute] != null && attributes[_attribute] != 'undefined' && attributes[_attribute] != '') {
                            for (var _iterator2 = attributes[_attribute], _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                                var _ref2;

                                if (_isArray2) {
                                    if (_i2 >= _iterator2.length) break;
                                    _ref2 = _iterator2[_i2++];
                                } else {
                                    _i2 = _iterator2.next();
                                    if (_i2.done) break;
                                    _ref2 = _i2.value;
                                }

                                var _option = _ref2;

                                if (_option.hasOwnProperty('id')) {
                                    _option.id = key + '.' + _option.value;
                                }
                                _options.push(_option);
                            }
                            attributes[_attribute] = _options;
                            createdElement.setAttribute('name', key);
                        }
                    }
                }
            }

            html += createdElement.outerHTML;

            html += templateEnd;

            return html;
        };

        return TemplateFactory;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'parent', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'keyString', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'optionString', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, 'attributesObjectString', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, 'element', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, 'value', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, 'data', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class) || _class);
});