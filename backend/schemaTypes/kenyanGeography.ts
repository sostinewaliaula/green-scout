export default {
    name: 'kenyanGeography',
    title: 'Kenyan Geography',
    type: 'document',
    fields: [
        {
            name: 'counties',
            title: 'Counties',
            type: 'array',
            of: [
                {
                    type: 'object',
                    name: 'county',
                    title: 'County',
                    fields: [
                        {
                            name: 'name',
                            title: 'County Name',
                            type: 'string',
                            validation: (Rule: any) => Rule.required(),
                        },
                        {
                            name: 'constituencies',
                            title: 'Constituencies',
                            type: 'array',
                            of: [{ type: 'string' }],
                            validation: (Rule: any) => Rule.required().min(1),
                        },
                    ],
                },
            ],
            description: 'Manage the list of Kenyan counties and their respective constituencies.',
        },
    ],
}
