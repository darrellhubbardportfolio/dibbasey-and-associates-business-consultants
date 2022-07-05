var passport = require("passport");

var TiktokStrategy = require("passport-tiktok-auth").Strategy;

// tiktok authentification strategy

passport.use(new TiktokStrategy({
    clientID: TIKTOK_CLIENT_ID,
    clientSecret: TIKTOK_CLIENT_SECRET,
    scope: ['user.info.basic'],
    callbackURL: "https://localhost:3000/auth/tiktok/callback"
},
function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ tiktokId: profile.id }, function (err, user) {
        return done(err, user);
    });
}
));