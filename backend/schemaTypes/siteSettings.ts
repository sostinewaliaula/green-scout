const siteSettings = {
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Site Title',
            type: 'string',
            description: 'The main title of the website'
        },
        {
            name: 'favicon',
            title: 'Favicon',
            type: 'image',
            description: 'The site favicon (best at 32x32 or 64x64 pixels). Defaults to the Green Scout tree icon if empty.',
            options: {
                hotspot: true
            }
        },
        {
            name: 'googleMapsApiKey',
            title: 'Google Maps API Key',
            type: 'string',
            description: 'The API key for Google Maps integration. If left empty, it will use the default system key.'
        },
        {
            name: 'notificationEmails',
            title: 'Notification Emails',
            type: 'array',
            description: 'Emails that will receive notifications when someone joins Green Scout.',
            of: [{ type: 'string' }],
            validation: (Rule: any) => Rule.unique().custom((emails: string[]) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const invalidEmails = emails?.filter((email: string) => !emailRegex.test(email));
                return invalidEmails?.length > 0 ? `Invalid email(s): ${invalidEmails.join(', ')}` : true;
            })
        },
        {
            name: 'emailjsServiceId',
            title: 'EmailJS Service ID',
            type: 'string',
            description: 'The Service ID from your EmailJS dashboard.'
        },
        {
            name: 'emailjsTemplateId',
            title: 'Admin EmailJS Template ID',
            type: 'string',
            description: 'The Template ID for admin notifications.'
        },
        {
            name: 'emailjsApplicantTemplateId',
            title: 'Applicant EmailJS Template ID',
            type: 'string',
            description: 'The Template ID for the automated reply to the applicant (optional).'
        },
        {
            name: 'emailjsPublicKey',
            title: 'EmailJS Public Key',
            type: 'string',
            description: 'The Public Key from your EmailJS dashboard.'
        },
        {
            name: 'sanityWriteToken',
            title: 'Sanity Write Token',
            type: 'string',
            description: 'A token with "Editor" or "Administrator" permissions to save registrations from the website.'
        }
    ]
};

export default siteSettings;
