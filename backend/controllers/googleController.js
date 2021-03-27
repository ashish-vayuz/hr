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