// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// const googleAuth = require("google_auth_library");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");
//   const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const findOrCreate = require("mongoose-findorcreate");

//db connection
const dbUri =
  "mongodb+srv://articlesHB:articlesHB123@cluster0.na6kn.mongodb.net/articlesDB";

app.use(cors());
app.use(express.json());
// app.use(session({
//   secret: "Our little secret.",
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

//connect to mongoose
mongoose.connect(dbUri);

//require route
app.use("/articles", require("./routes/articleRoute"));
app.use("/users", require("./routes/userRoute"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3002, function () {
  console.log("express server is running on port 3002");
});
