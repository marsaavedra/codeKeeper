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

// For Passport
app.use(session({ secret: 'repeeKedoc',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/coder', require('./routes/coder-api-routes'));

//require("./routes/html-routes.js")(app);
// require("./routes/coder-api-routes.js")(app);
// require("./routes/snips-api-routes.js")(app);

db.sequelize.sync({ /*force: true*/ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
  });
});