var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

require("./routes/html-routes.js")(app);
require("./routes/coder-api-routes.js")(app);
require("./routes/snips-api-routes.js")(app);

db.sequelize.sync({ /*force: true*/ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
  });
});