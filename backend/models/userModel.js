const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  displayName: { type: String, required: true },
  articles: [{ title: String, articleId: String }],
});
// userSchema.plugin(passportLocalMongoose);
// userSchema.plugin(findOrCreate);

// passport.use(User.createStrategy());
// passport.serializeUser(function (user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
//   User.findById(id, function (err, user) {
//     done(err, user);
//   });
// });
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.CLIENT_ID,
//       clientSecret: process.env.CLIENT_SECRET,
//       callbackURL: "http://localhost:3002/users/googlelogin",
//       userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
//     },
//     function (accessToken, refreshToken, profile, cb) {
//       User.findOrCreate(
//         { googleId: profile.id, username: profile.id },
//         function (err, user) {
//           return cb(err, user);
//         }
//       );
//     }
//   )
// );
module.exports = User = mongoose.model("user", userSchema);
