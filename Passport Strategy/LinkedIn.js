var passport = require("passport");

var LinkedInStrategy = require("passport-linkedin").Strategy;

passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));