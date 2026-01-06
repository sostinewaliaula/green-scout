export default {
    name: 'donation',
    title: 'Individual Donations',
    type: 'document',
    fields: [
        {
            name: 'donorName',
            title: 'Donor Name',
            type: 'string',
        },
        {
            name: 'donorEmail',
            title: 'Donor Email',
            type: 'string',
        },
        {
            name: 'donorPhone',
            title: 'Donor Phone Number',
            type: 'string',
        },
        {
            name: 'amount',
            title: 'Amount (KES)',
            type: 'number',
        },
        {
            name: 'purpose',
            title: 'Donation Purpose',
            type: 'string',
            options: {
                list: [
                    { title: 'Plant a tree', value: 'tree' },
                    { title: 'Support school clubs', value: 'schools' },
                    { title: 'Community training', value: 'training' },
                    { title: 'General support', value: 'general' },
                ]
            }
        },
        {
            name: 'paystackReference',
            title: 'Paystack Reference',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'status',
            title: 'Payment Status',
            type: 'string',
            initialValue: 'pending',
            options: {
                list: ['pending', 'success', 'failed']
            }
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
        },
    ],
    preview: {
        select: {
            title: 'donorName',
            subtitle: 'amount',
        },
    },
}
