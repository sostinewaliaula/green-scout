const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'cew8k4ec',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: 'sk3yArDKUuNpZ561JAY8kdk0c73g4VsWHpf62Kq2TfuQpyRY9jZcJStZznyfps8xbWaFVqEg6o0KaxBkX1dB5ISNPsA2yOK1Y0slYjpQhhTns6E7hM5DlghbiBrrly9wJXOUqslRowRwezVU7ivM3Hs6jss45YF1v3vcG49lvH1597u9Fudt',
});

async function seedForms() {
    console.log('🚀 Seeding Registration Forms...');

    // 1. Seed Registration Form (Volunteer)
    console.log('📝 Seeding Volunteer Registration Form...');
    const volunteerForm = {
        _id: 'volunteer-form',
        _type: 'registrationForm',
        slug: { current: 'volunteer-form' },
        title: 'Join the Movement',
        description: 'Fill out the form below to become a volunteer.',
        successTitle: "You're on the Team!",
        successMessage: 'Thank you for joining Green Scout. Our team will reach out to you shortly to get you started on your journey.',
        sections: [
            {
                _key: 'personal-details',
                title: 'Personal Details',
                icon: 'User',
                fields: [
                    { _key: 'f1', name: 'name', label: 'Full Name', type: 'text', placeholder: 'Jane Doe', required: true, icon: 'User' },
                    { _key: 'f2', name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+254 700 000 000', required: true, icon: 'Phone' },
                    { _key: 'f3', name: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@example.com', required: true, icon: 'Mail' },
                    { _key: 'f4', name: 'county', label: 'Location (County)', type: 'countyDropdown', placeholder: 'Search County...', required: true, icon: 'MapPin' },
                    { _key: 'f5', name: 'constituency', label: 'Constituency', type: 'constituencyDropdown', placeholder: 'Search Constituency...', required: true, icon: 'Building' },
                    { _key: 'f6', name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true, icon: 'Users' },
                    { _key: 'f7', name: 'age', label: 'Age', type: 'number', placeholder: '20', required: true, icon: 'Calendar' },
                ]
            },
            {
                _key: 'scouting-background',
                title: 'Scouting Background',
                icon: 'LayoutList',
                fields: [
                    {
                        _key: 'f8',
                        name: 'isScout',
                        label: 'Are you currently a member of the scouts?',
                        type: 'radio',
                        options: ['Yes', 'No'],
                        required: true
                    },
                    {
                        _key: 'f9',
                        name: 'rank',
                        label: 'Rank / Level',
                        type: 'select',
                        options: ['Sungura', 'Chipukizi', 'Mwamba', 'Jasiri'],
                        icon: 'Trophy',
                        showIf: { fieldName: 'isScout', value: 'yes' }
                    },
                    {
                        _key: 'f10',
                        name: 'school',
                        label: 'Scout Troop / School Name',
                        type: 'text',
                        placeholder: 'e.g. Green Valley Scouts',
                        icon: 'GraduationCap',
                        showIf: { fieldName: 'isScout', value: 'yes' }
                    },
                    {
                        _key: 'f11',
                        name: 'countyAssociation',
                        label: 'County Scout Association',
                        type: 'text',
                        placeholder: 'e.g. Nairobi City County Scout Association',
                        icon: 'Flag',
                        showIf: { fieldName: 'isScout', value: 'yes' }
                    }
                ]
            }
        ]
    };

    try {
        await client.createOrReplace(volunteerForm);
        console.log('✅ Volunteer Form Seeded!');
    } catch (err) {
        console.error('❌ Failed to seed Volunteer Form:', err.message);
    }

    // 2. Seed Partnership Form
    console.log('🤝 Seeding Partnership Form...');
    const partnerForm = {
        _id: 'partner-form',
        _type: 'registrationForm',
        slug: { current: 'partner-form' },
        title: 'Partner With Us',
        description: 'Collaborate with Green Scout to create a sustainable future.',
        successTitle: 'Partnership Inquiry Received!',
        successMessage: 'Thank you for your interest in partnering with Green Scout. Our partnership coordination team will review your information and contact you within 3-5 business days.',
        sections: [
            {
                _key: 'org-data',
                title: 'Organization Data',
                icon: 'Building2',
                fields: [
                    { _key: 'p1', name: 'organizationName', label: 'Organization Name', type: 'text', placeholder: 'e.g. Green Earth Foundation', required: true, icon: 'Home' },
                    { _key: 'p2', name: 'organizationType', label: 'Type of Organization', type: 'select', options: ['NGO', 'Government body', 'Corporate', 'International organization', 'Academic Institution', 'Other'], required: true, icon: 'Briefcase' },
                    { _key: 'p2b', name: 'organizationTypeOther', label: 'Specify Other', type: 'text', placeholder: 'Specify organization type', icon: 'Edit3', showIf: { fieldName: 'organizationType', value: 'other' } },
                    { _key: 'p3', name: 'regionOfOperation', label: 'County/Region of Operation', type: 'text', placeholder: 'e.g. Nairobi, Kisumu and Nakuru', required: true, icon: 'MapPin' },
                    { _key: 'p4', name: 'website', label: 'Website / Social Media Handles', type: 'text', placeholder: 'https://www.example.com', icon: 'Globe' },
                ]
            },
            {
                _key: 'contact-info',
                title: 'Contact Information',
                icon: 'Contact',
                fields: [
                    { _key: 'p5', name: 'contactPerson', label: 'Primary Contact Person', type: 'text', placeholder: 'Jane Smith', required: true, icon: 'User' },
                    { _key: 'p6', name: 'designation', label: 'Designation', type: 'text', placeholder: 'Director of Partnerships', required: true, icon: 'Award' },
                    { _key: 'p7', name: 'email', label: 'Official Email Address', type: 'email', placeholder: 'jane@org.com', required: true, icon: 'Mail' },
                    { _key: 'p8', name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+254 700 000 000', required: true, icon: 'Phone' },
                ]
            },
            {
                _key: 'partnership-details',
                title: 'Partnership Details',
                icon: 'Handshake',
                fields: [
                    {
                        _key: 'p9',
                        name: 'interests',
                        label: 'Primary Area of Interest',
                        type: 'select',
                        options: [
                            'Seedling donation/procurement',
                            'Land provision for tree planting',
                            'Technical expertise and training(scout climate literacy)',
                            'Financial sponsorship/grant funding',
                            'Logistics support(transport/tools)',
                            'Policy advocacy & parliamentary engagement'
                        ],
                        required: true,
                        icon: 'Target'
                    },
                    {
                        _key: 'p10',
                        name: 'proposedScope',
                        label: 'Proposed Scope of Collaboration',
                        type: 'textarea',
                        placeholder: 'Briefly describe how you envision working with WSPU-K and GreenScout',
                        required: true,
                        icon: 'ScrollText'
                    },
                    {
                        _key: 'p11',
                        name: 'duration',
                        label: 'Estimated Duration of Partnership',
                        type: 'text',
                        placeholder: 'e.g. 1 year, 3 years, etc.',
                        required: true,
                        icon: 'Hourglass'
                    },
                    {
                        _key: 'p12',
                        name: 'preferredMeetingDate',
                        label: 'Preferred Meeting Date for Discussion',
                        type: 'date',
                        required: true,
                        icon: 'CalendarDays'
                    }
                ]
            }
        ]
    };

    try {
        await client.createOrReplace(partnerForm);
        console.log('✅ Partnership Form Seeded!');
    } catch (err) {
        console.error('❌ Failed to seed Partnership Form:', err.message);
    }
}

seedForms();
