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
        }
    ]
};

export default siteSettings;
