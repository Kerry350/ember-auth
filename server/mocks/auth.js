module.exports = function(app) {
    var express = require('express');
    var authRouter = express.Router();
    var FB = require('fb');
    var bodyParser = require('body-parser');

    // Takes the authorisation code that Torii acquired,
    // swaps it for an access token, and obtains user details
    // In a real application once you had the users' profile
    // information you would most likely want to tie this to
    // a user in your system via the ID
    authRouter.post('/facebook', function(req, res) {
        FB.api('oauth/access_token', {
            client_id: 'ID_HERE',
            client_secret: 'SECRET_HERE',
            redirect_uri: 'http://localhost:4200/',
            code: req.body.authorizationCode
        }, function(data) {
            if (res && res.error) {
                console.log(res.error);
            }

            var accessToken = data.access_token;

            FB.api('me?access_token=' + accessToken, function(user) {
                if (res && res.error) {
                    console.log(res.error);
                }

                res.status(200).send({
                    user: user
                })
            });
        });
    });

    app.use(bodyParser.urlencoded({
        extended: false
    }))
    app.use(bodyParser.json())
    app.use('/api/auth', authRouter);
};
