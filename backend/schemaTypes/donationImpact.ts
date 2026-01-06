export default {
    name: 'donationImpact',
    title: 'Donation & Impact Stats',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Display Title',
            type: 'string',
            initialValue: 'Our Impact',
        },
        {
            name: 'totalRaised',
            title: 'Total Amount Collected (KES)',
            type: 'number',
            description: 'The total amount raised so far in Kenyan Shillings.',
        },
        {
            name: 'targetGoal',
            title: 'Current Fundraising Goal (KES)',
            type: 'number',
        },
        {
            name: 'treesPlanted',
            title: 'Total Trees Planted',
            type: 'number',
        },
        {
            name: 'usageDetails',
            title: 'How funds are used',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'activity', title: 'Activity/Project', type: 'string' },
                        { name: 'description', title: 'Details', type: 'text' },
                        { name: 'cost', title: 'Allocated Amount (KES)', type: 'number' },
                        { name: 'date', title: 'Date', type: 'date' },
                    ]
                }
            ]
        },
    ],
}
