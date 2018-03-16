const   userModel = require('../models/index').User;

module.exports = function(app, db){
    var MicrosoftStrategy = require('passport-microsoft').Strategy;
    var passport = require('passport');
    var authConfig = require('../config/microsoft.auth');

    passport.use(new MicrosoftStrategy({
            clientID: authConfig.clientID,
            clientSecret: authConfig.clientSecret,
            callbackURL: authConfig.callbackURL,
            scope: 'https://graph.microsoft.com/user.read'
        },
        function(accessToken, refreshToken, profile, done) {
            userModel.findOne({name: profile.displayName}, (err, user) => {
                if (err)
                    done(err);
                else {
                    if (user)
                        done(err, user);
                    else
                        userModel.create({name: profile.displayName, status: ""}, (err, result) => {
                            done(err, result);
                        });
                }
            });
            console.log(profile);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    })

    var url = require('url'),
        express = require('express'),
        router = express.Router();

    router.get('/', passport.authenticate('microsoft'));

    router.get('/callback',
        passport.authenticate('microsoft', { failureRedirect: '/' }),
        function(req,res) {
            res.redirect('/');
        }
    )

    app.use('/api/auth',router);
    return router;
}