export default {
    name: 'partner',
    title: 'Partnerships',
    type: 'document',
    fields: [
        {
            name: 'organizationName',
            title: 'Organization Name',
            type: 'string',
        },
        {
            name: 'organizationType',
            title: 'Type of Organization',
            type: 'string',
        },
        {
            name: 'organizationTypeOther',
            title: 'Organization Type (Other)',
            type: 'string',
            hidden: ({ document }: any) => document?.organizationType !== 'other',
        },
        {
            name: 'regionOfOperation',
            title: 'County/Region of Operation',
            type: 'string',
        },
        {
            name: 'website',
            title: 'Website/Social Media',
            type: 'string',
        },
        {
            name: 'contactPerson',
            title: 'Primary Contact Person',
            type: 'string',
        },
        {
            name: 'designation',
            title: 'Designation',
            type: 'string',
        },
        {
            name: 'email',
            title: 'Official Email Address',
            type: 'string',
        },
        {
            name: 'phone',
            title: 'Phone Number',
            type: 'string',
        },
        {
            name: 'interests',
            title: 'Primary Area of Interest',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'proposedScope',
            title: 'Proposed Scope of Collaboration',
            type: 'text',
        },
        {
            name: 'duration',
            title: 'Estimated Duration of Partnership',
            type: 'string',
        },
        {
            name: 'preferredMeetingDate',
            title: 'Preferred Meeting Date',
            type: 'date',
        },
        {
            name: 'submittedAt',
            title: 'Submitted At',
            type: 'datetime',
        },
        {
            name: 'rawSubmission',
            title: 'Raw Submission Data',
            type: 'text',
            rows: 5,
            readOnly: true,
        },
    ],
    preview: {
        select: {
            title: 'organizationName',
            subtitle: 'contactPerson',
        },
    },
}
