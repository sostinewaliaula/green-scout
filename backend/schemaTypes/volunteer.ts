export default {
    name: 'volunteer',
    title: 'Volunteers',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Full Name',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'email',
            title: 'Email Address',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'county',
            title: 'County',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'constituency',
            title: 'Constituency',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'gender',
            title: 'Gender',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'age',
            title: 'Age',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'isScout',
            title: 'Currently a Scout?',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'rank',
            title: 'Rank/Level',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'school',
            title: 'School/Troop',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'countyAssociation',
            title: 'County Association',
            type: 'string',
            readOnly: true,
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        },
        {
            name: 'rawSubmission',
            title: 'Raw Submission Data',
            type: 'text',
            description: 'Backup of all fields submitted.',
            readOnly: true,
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'email',
        }
    }
}
