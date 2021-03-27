import GoogleStrategy from 'passport-google-oauth20'
import passport from 'passport'
import express from 'express'
import User from '../models/userModel.js'
const router = express.Router()

passport.use(new GoogleStrategy.Strategy({
    clientID: '654495353600-rkkgf6206m1e8uamb70jm1g6057r90a5.apps.googleusercontent.com',
    clientSecret: 'Ckja6EqoA1m86lpYVCX9uf5u',
    callbackURL: "/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));

router.get('/login/oauth2',
    passport.authenticate('oauth2'));

router.get('/return',
    passport.authenticate('oauth2', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
});

export default router;