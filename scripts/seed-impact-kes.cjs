const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'cew8k4ec',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: 'sk3yArDKUuNpZ561JAY8kdk0c73g4VsWHpf62Kq2TfuQpyRY9jZcJStZznyfps8xbWaFVqEg6o0KaxBkX1dB5ISNPsA2yOK1Y0slYjpQhhTns6E7hM5DlghbiBrrly9wJXOUqslRowRwezVU7ivM3Hs6jss45YF1v3vcG49lvH1597u9Fudt', // Using the provided write token
});

async function seedImpactKES() {
    console.log('Seeding Kenyan Shilling Impact Data...');

    const impactDoc = {
        _type: 'donationImpact',
        _id: 'donationImpact', // Singleton ID
        title: 'Our Impact',
        totalRaised: 250000,
        targetGoal: 2000000,
        treesPlanted: 1240,
        usageDetails: [
            {
                _key: 'h1',
                activity: 'Community Tree Nursery Setup',
                description: 'Established a central nursery in Nairobi with capacity for 5,000 seedlings.',
                cost: 120000,
                date: '2024-01-15'
            },
            {
                _key: 'h2',
                activity: 'Green Schools Outreach',
                description: 'Supported 10 environmental clubs in primary schools with tools and training.',
                cost: 85000,
                date: '2024-02-10'
            },
            {
                _key: 'h3',
                activity: 'Indigenous Seedlings Purchase',
                description: 'Secured 500 indigenous tree seedlings for the upcoming rainy season planting.',
                cost: 45000,
                date: '2024-03-05'
            }
        ]
    };

    try {
        await client.createOrReplace(impactDoc);
        console.log('✅ Impact data successfully seeded with KES values!');

        const donationSettings = {
            _type: 'donationSettings',
            _id: 'donationSettings',
            title: 'Support Green Scout',
            description: 'Choose an amount and purpose for your donation.',
            showPhoneField: true,
            nameLabel: 'Display Name',
            emailLabel: 'Email Address',
            phoneLabel: 'Phone Number (Optional)',
            presetAmounts: [500, 1000, 2000, 5000, 10000],
            successTitle: 'Thank You for Planting Hope!',
            successMessage: 'Your contribution has been received. Together, we are creating a greener, more sustainable future for Kenya.',
            purposes: [
                { _key: 'p1', label: 'General Tree Planting', value: 'tree' },
                { _key: 'p2', label: 'School Environmental Clubs', value: 'schools' },
                { _key: 'p3', label: 'Youth Green Skills Training', value: 'training' },
                { _key: 'p4', label: 'Green Scout Core Mission', value: 'general' },
            ]
        };

        await client.createOrReplace(donationSettings);
        console.log('✅ Donation settings successfully seeded!');

    } catch (err) {
        console.error('❌ Failed to seed:', err.message);
    }
}

seedImpactKES();
