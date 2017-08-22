var express = require("express");
var passport = require("passport");
var session = require("express-session");
var bodyParser = require("body-parser");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static directory
app.use(express.static(__dirname + '/public'));

// For Passport
app.use(session({ secret: 'repeeKedoc',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Routes
require("./routes/html-routes.js")(app);
require("./routes/coder-api-routes.js")(app, passport);
require("./routes/snips-api-routes.js")(app);

//load passport strategies
require("./config/passport/passport.js")(passport, db.User);

//Sync Database
db.sequelize.sync({ /*force: true */}).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
  });
});