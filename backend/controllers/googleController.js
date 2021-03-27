import { google } from 'googleapis';

const googleConfig = {
    clientId: '654495353600-rkkgf6206m1e8uamb70jm1g6057r90a5.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'Ckja6EqoA1m86lpYVCX9uf5u', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'https://your-website.com/google-auth' // this must match your google api settings
};

const createConnection = () => {
    return new google.auth.OAuth2(
        googleConfig.clientId,
        googleConfig.clientSecret,
        googleConfig.redirect
    );
}

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];

function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
        scope: defaultScope
    });
}

function urlGoogle() {
    const auth = createConnection(); // this is from previous step
    const url = getConnectionUrl(auth);
    return url;
}