
export class DynamicView {

    constructor() {

        this.thisVM = this;
        this.keyString = 'key';
        this.optionString = 'options';
        this.attributesObjectString = 'attributes';
        this.elements = ''

        this.selectView =  [{
            'htmlElementType': 'select',
            'htmlElementAlias': 'my-dropdown',
            'attributes': {
                'key': 'selectView',
                'labelText': 'Select a View',
                'formGroupLabelClass': 'control-label',
                'selectClass': '',
                'options': [
                    {
                        'value': '1',
                        'text': 'View 1'
                    },
                    {
                        'value': '2',
                        'text': 'View 2'
                    }
                ],
                'value.bind': 'selectView'
            }
        }]


        this.viewOneElements = [
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

        this.viewTwoElements = [
            {
                'htmlElementType': 'checkbox',
                'htmlElementAlias': 'my-checkbox',
                'attributes': {
                    'key': 'pets',
                    'labelText': 'Select the Pets',
                    'formGroupLabelClass': 'control-label',
                    'optionInputClass': '',
                    'optionLabelClass': '',
                    'options': [
                        {
                            'id': 'cat',
                            'value': 'cat',
                            'text': 'Cat'
                        },
                        {
                            'id': 'dog',
                            'value': 'dog',
                            'text': 'Dog'
                        }
                    ],
                    'value.bind': 'pets'
                }
            },
            {
                'htmlElementType': 'select',
                'htmlElementAlias': 'my-dropdown',
                'attributes': {
                    'key': 'color',
                    'labelText': 'Favorite Color',
                    'formGroupLabelClass': 'control-label',
                    'selectClass': '',
                    'options': [
                        {
                            'value': 'red',
                            'text': 'Red'
                        },
                        {
                            'value': 'green',
                            'text': 'Green'
                        },
                        {
                            'value': 'blue',
                            'text': 'Blue'
                        }
                    ],
                    'value.bind': 'color'
                }
            }
        ]
    }

    activate(){
        this.elements = this.viewOneElements;
    }

}
