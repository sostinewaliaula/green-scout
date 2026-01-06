export default {
    name: 'donationSettings',
    title: 'Donation Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Modal Title',
            type: 'string',
            initialValue: 'Support Green Scout',
        },
        {
            name: 'description',
            title: 'Modal Description',
            type: 'text',
            rows: 2,
            initialValue: 'Choose an amount and purpose for your donation.',
        },
        {
            name: 'showPhoneField',
            title: 'Display Phone Number Field?',
            type: 'boolean',
            initialValue: true,
        },
        {
            name: 'nameLabel',
            title: 'Name Field Label',
            type: 'string',
            initialValue: 'Display Name',
        },
        {
            name: 'emailLabel',
            title: 'Email Field Label',
            type: 'string',
            initialValue: 'Email Address',
        },
        {
            name: 'phoneLabel',
            title: 'Phone Field Label',
            type: 'string',
            initialValue: 'Phone Number (Optional)',
        },
        {
            name: 'presetAmounts',
            title: 'Preset Donation Amounts (KES)',
            type: 'array',
            of: [{ type: 'number' }],
            initialValue: [500, 1000, 2000, 5000, 10000],
        },
        {
            name: 'successTitle',
            title: 'Success Message Title',
            type: 'string',
            initialValue: 'Thank You for Planting Hope!',
        },
        {
            name: 'successMessage',
            title: 'Success Message Body',
            type: 'text',
            rows: 3,
            initialValue: 'Your contribution has been received. Together, we are creating a greener, more sustainable future for Kenya.',
        },
        {
            name: 'purposes',
            title: 'Donation Purposes',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'label', title: 'Display Label', type: 'string' },
                        { name: 'value', title: 'Internal Value', type: 'string' },
                    ]
                }
            ],
            initialValue: [
                { label: 'General Tree Planting', value: 'tree' },
                { label: 'School Environmental Clubs', value: 'schools' },
                { label: 'Youth Green Skills Training', value: 'training' },
                { label: 'Green Scout Core Mission', value: 'general' },
            ]
        }
    ],
}
