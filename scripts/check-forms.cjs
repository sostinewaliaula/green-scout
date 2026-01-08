const { createClient } = require('@sanity/client');

const client = createClient({
    projectId: 'cew8k4ec',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
    token: 'sk3yArDKUuNpZ561JAY8kdk0c73g4VsWHpf62Kq2TfuQpyRY9jZcJStZznyfps8xbWaFVqEg6o0KaxBkX1dB5ISNPsA2yOK1Y0slYjpQhhTns6E7hM5DlghbiBrrly9wJXOUqslRowRwezVU7ivM3Hs6jss45YF1v3vcG49lvH1597u9Fudt',
});

async function checkForms() {
    const forms = await client.fetch('*[_type == "registrationForm"]{_id, title, slug}');

    console.log('--- Found Forms ---');
    forms.forEach(f => {
        console.log(`ID: ${f._id} | Title: ${f.title} | Slug: ${f.slug?.current}`);
    });
    console.log('-------------------');

    const geography = await client.fetch('*[_type == "kenyanGeography"][0]');
    console.log('Geography:', geography ? '✅ Found' : '❌ Missing');
}

checkForms();
