import { createClient } from '@sanity/client';

/**
 * SEEDING SCRIPT FOR GREEN SCOUT SANITY CRM
 * 
 * This script populates the Sanity Studio with:
 * 1. Kenyan Geography (Counties & Constituencies)
 * 2. Registration Form Initial Structure
 * 
 * HOW TO RUN:
 * 1. Get a Sanity Write Token from: https://www.sanity.io/manage
 * 2. Run: $env:SANITY_AUTH_TOKEN="your_token"; node scripts/seed-sanity.js
 */

const KENYAN_GEOGRAPHY = {
    'Mombasa': ['Changamwe', 'Jomvu', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
    'Kwale': ['Msambweni', 'Lunga Lunga', 'Matuga', 'Kinango'],
    'Kilifi': ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
    'Tana River': ['Garsen', 'Galole', 'Bura'],
    'Lamu': ['Lamu East', 'Lamu West'],
    'Taita-Taveta': ['Taveta', 'Wundanyi', 'Mwatate', 'Voi'],
    'Garissa': ['Garissa Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi', 'Ijara'],
    'Wajir': ['Wajir North', 'Wajir East', 'Wajir South', 'Wajir West', 'Eldas', 'Tarbaj'],
    'Mandera': ['Mandera West', 'Banissa', 'Mandera North', 'Mandera South', 'Mandera East', 'Lafey'],
    'Marsabit': ['Moyale', 'North Horr', 'Saku', 'Laisamis'],
    'Isiolo': ['Isiolo North', 'Isiolo South'],
    'Meru': ['Igembe South', 'Igembe Central', 'Igembe North', 'Tigania West', 'Tigania East', 'North Imenti', 'Buuri', 'Central Imenti', 'South Imenti'],
    'Tharaka-Nithi': ['Maara', 'Chuka/Igambang\'ombe', 'Tharaka'],
    'Embu': ['Manyatta', 'Runyenjes', 'Mbeere South', 'Mbeere North'],
    'Kitui': ['Mwingi North', 'Mwingi West', 'Mwingi Central', 'Kitui West', 'Kitui Rural', 'Kitui Central', 'Kitui East', 'Kitui South'],
    'Machakos': ['Masinga', 'Yatta', 'Kangundo', 'Matungulu', 'Kathiani', 'Mavoko', 'Machakos Town', 'Mwala'],
    'Makueni': ['Mbooni', 'Kilome', 'Kaiti', 'Makueni', 'Kibwezi East', 'Kibwezi West'],
    'Nyandarua': ['Kinangop', 'Ol Kalou', 'Ol Joro Orok', 'Ndaragwa', 'Kipipiri'],
    'Nyeri': ['Tetu', 'Kieni', 'Mathira', 'Othaya', 'Mukurweini', 'Nyeri Town'],
    'Kirinyaga': ['Mwea', 'Gichugu', 'Ndia', 'Kirinyaga Central'],
    'Murang\'a': ['Kangema', 'Mathioya', 'Kandara', 'Kigumo', 'Maragwa', 'Kiharu', 'Gatanga'],
    'Kiambu': ['Gatundu South', 'Gatundu North', 'Juja', 'Thika Town', 'Ruiru', 'Githunguri', 'Kiambu', 'Kiambaa', 'Kabete', 'Kikuyu', 'Limuru', 'Lari'],
    'Turkana': ['Turkana North', 'Turkana West', 'Turkana Central', 'Loima', 'Turkana South', 'Turkana East'],
    'West Pokot': ['Kapenguria', 'Sigor', 'Kacheliba', 'Pokot South'],
    'Samburu': ['Samburu West', 'Samburu North', 'Samburu East'],
    'Trans-Nzoia': ['Kwanza', 'Endebess', 'Saboti', 'Cherangay', 'Kiminini'],
    'Uasin Gishu': ['Turbo', 'Moiben', 'Ainabkoi', 'Kapseret', 'Kesses', 'Soy'],
    'Elgeyo-Marakwet': ['Marakwet East', 'Marakwet West', 'Keiyo North', 'Keiyo South'],
    'Nandi': ['Tinderet', 'Aldai', 'Nandi Hills', 'Chesumei', 'Emgwen', 'Mosop'],
    'Baringo': ['Baringo East', 'Baringo West', 'Baringo Central', 'Mogotio', 'Eldama Ravine', 'Baringo South'],
    'Laikipia': ['Laikipia West', 'Laikipia East', 'Laikipia North'],
    'Nakuru': ['Molo', 'Njoro', 'Naivasha', 'Gilgil', 'Kuresoi South', 'Kuresoi North', 'Subukia', 'Rongai', 'Bahati', 'Nakuru Town West', 'Nakuru Town East'],
    'Narok': ['Kilgoris', 'Emurua Dikirr', 'Narok North', 'Narok East', 'Narok West', 'Narok South'],
    'Kajiado': ['Kajiado North', 'Kajiado Central', 'Kajiado East', 'Kajiado West', 'Kajiado South'],
    'Kericho': ['Kipkelion East', 'Kipkelion West', 'Ainamoi', 'Bureti', 'Belgut', 'Sigowet/Soin'],
    'Bomet': ['Sotik', 'Chepalungu', 'Bomet East', 'Bomet Central', 'Konoin'],
    'Kakamega': ['Lugari', 'Likuyani', 'Malava', 'Lurambi', 'Navakholo', 'Mumias West', 'Mumias East', 'Matungu', 'Butere', 'Khwisero', 'Shinyalu', 'Ikolomani'],
    'Vihiga': ['Vihiga', 'Sabatia', 'Hamisi', 'Luanda', 'Emuhaya'],
    'Bungoma': ['Mt Elgon', 'Sirisia', 'Kabuchai', 'Bumula', 'Kanduyi', 'Webuye East', 'Webuye West', 'Kimilili', 'Tongaren'],
    'Busia': ['Teso North', 'Teso South', 'Nambale', 'Butula', 'Funyula', 'Samia', 'Budalangi'],
    'Siaya': ['Ugenya', 'Ugunja', 'Alego Usonga', 'Gem', 'Bondo', 'Rarieda'],
    'Kisumu': ['Kisumu East', 'Kisumu West', 'Kisumu Central', 'Seme', 'Nyando', 'Muhoroni', 'Nyakach'],
    'Homa Bay': ['Kasipul', 'Kabondo Kasipul', 'Karachuonyo', 'Rangwe', 'Homa Bay Town', 'Ndhiwa', 'Suba North', 'Suba South'],
    'Migori': ['Rongo', 'Awendo', 'Suna East', 'Suna West', 'Uriri', 'Nyatike', 'Kuria East', 'Kuria West'],
    'Kisii': ['Bonchari', 'South Mugirango', 'Bomachoge Borabu', 'Bomachoge Chache', 'Bobasi', 'South Mugirango', 'Macha Chache', 'Kitutu Chache North', 'Kitutu Chache South', 'Nyaribari Masaba', 'Nyaribari Chache'],
    'Nyamira': ['Kitutu Masaba', 'North Mugirango', 'West Mugirango', 'Borabu'],
    'Nairobi': ['Westlands', 'Dagoretti North', 'Dagoretti South', 'Lang\'ata', 'Kibra', 'Roysambu', 'Kasarani', 'Ruaraka', 'Embakasi South', 'Embakasi North', 'Embakasi Central', 'Embakasi East', 'Embakasi West', 'Makadara', 'Kamukunji', 'Starehe', 'Mathare']
};

const client = createClient({
    projectId: 'cew8k4ec',
    dataset: 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_AUTH_TOKEN,
    useCdn: false,
});

async function seed() {
    if (!process.env.SANITY_AUTH_TOKEN) {
        console.error('❌ Error: SANITY_AUTH_TOKEN is missing.');
        console.log('Please run: $env:SANITY_AUTH_TOKEN="your_token"; node scripts/seed-sanity.js');
        process.exit(1);
    }

    console.log('🚀 Starting Seeding...');

    try {
        // 1. Seed Kenyan Geography
        console.log('📍 Seeding Kenyan Geography...');
        const counties = Object.entries(KENYAN_GEOGRAPHY).map(([name, constituencies]) => ({
            _key: name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase(),
            name,
            constituencies
        }));

        await client.createOrReplace({
            _id: 'kenyanGeography',
            _type: 'kenyanGeography',
            counties: counties
        });
        console.log('✅ Geography Seeded!');

        // 2. Seed Registration Form Structure
        console.log('📝 Seeding Registration Form...');
        const formStructure = {
            _id: 'registrationForm',
            _type: 'registrationForm',
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
                            type: 'rankDropdown',
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

        await client.createOrReplace(formStructure);
        console.log('✅ Registration Form Seeded!');

        console.log('\n✨ All data successfully migrated to Sanity!');
    } catch (err) {
        console.error('❌ Seeding failed:', err.message);
    }
}

seed();
