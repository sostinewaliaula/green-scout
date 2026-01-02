export default {
    name: 'registrationForm',
    title: 'Registration Form Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Form Title',
            type: 'string',
            description: 'The heading shown at the top of the form (e.g. "Join the Movement")',
        },
        {
            name: 'description',
            title: 'Form Description',
            type: 'text',
            rows: 2,
            description: 'The sub-heading shown below the title.',
        },
        {
            name: 'successTitle',
            title: 'Success Message Title',
            type: 'string',
            description: 'Title shown after successful submission (e.g. "You\'re on the Team!")',
        },
        {
            name: 'successMessage',
            title: 'Success Message Body',
            type: 'text',
            rows: 3,
            description: 'Detailed message shown after successful submission.',
        },
        {
            name: 'sections',
            title: 'Form Sections',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'section',
                    title: 'Section',
                    fields: [
                        {
                            name: 'title',
                            title: 'Section Title',
                            type: 'string',
                        },
                        {
                            name: 'icon',
                            title: 'Icon Name',
                            type: 'string',
                            description: 'Lucide icon name (e.g. "User", "Mail", "LayoutList")',
                        },
                        {
                            name: 'fields',
                            title: 'Fields',
                            type: 'array',
                            of: [
                                {
                                    type: 'object',
                                    name: 'field',
                                    title: 'Field',
                                    fields: [
                                        {
                                            name: 'name',
                                            title: 'Field Internal Name',
                                            type: 'string',
                                            description: 'The key used in the data and email (e.g. "name", "email", "age")',
                                        },
                                        {
                                            name: 'label',
                                            title: 'Field Label',
                                            type: 'string',
                                        },
                                        {
                                            name: 'type',
                                            title: 'Field Type',
                                            type: 'string',
                                            options: {
                                                list: [
                                                    { title: 'Text', value: 'text' },
                                                    { title: 'Email', value: 'email' },
                                                    { title: 'Phone', value: 'tel' },
                                                    { title: 'Number', value: 'number' },
                                                    { title: 'Select', value: 'select' },
                                                    { title: 'Radio', value: 'radio' },
                                                    { title: 'County Dropdown', value: 'countyDropdown' },
                                                    { title: 'Constituency Dropdown', value: 'constituencyDropdown' },
                                                    { title: 'Rank/Level Dropdown', value: 'rankDropdown' },
                                                ],
                                            },
                                        },
                                        {
                                            name: 'placeholder',
                                            title: 'Placeholder',
                                            type: 'string',
                                        },
                                        {
                                            name: 'required',
                                            title: 'Is Required?',
                                            type: 'boolean',
                                            initialValue: true,
                                        },
                                        {
                                            name: 'options',
                                            title: 'Options',
                                            type: 'array',
                                            of: [{ type: 'string' }],
                                            description: 'Only for Radio or Select types.',
                                            hidden: ({ parent }: any) => !['radio', 'rankDropdown'].includes(parent?.type),
                                        },
                                        {
                                            name: 'icon',
                                            title: 'Field Icon',
                                            type: 'string',
                                            description: 'Lucide icon name for the input (e.g. "User", "Phone")',
                                        },
                                        {
                                            name: 'showIf',
                                            title: 'Show Conditional Logic',
                                            type: 'object',
                                            fields: [
                                                { name: 'fieldName', title: 'Depends on Field', type: 'string' },
                                                { name: 'value', title: 'Wait for Value', type: 'string' },
                                            ],
                                            description: 'Only show this field if another field has a certain value.',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
}
