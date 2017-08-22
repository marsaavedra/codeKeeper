// Dependencies
var db = require("../models");
var path = require("path");

module.exports = function(app, passport){

	app.get('/signup', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signup.html"));
 	});

	app.get('/signin', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signin.html"));
 	});

	app.post("/signin", function(req, res, next){
		console.log('in');

		passport.authenticate("signin", function(err, coder, msg){
			var data = {
				error: err,
				coder: coder,
				msg: msg
			}
			return res.json(data);
		})(req, res, next);
	});

	app.post("/signup", function(req, res, next){
		passport.authenticate("signup", function(err, coder, msg){
			var data = {
				error: err,
				coder: coder,
				msg: msg
			}
			return res.json(data);
		})(req, res, next);
	});	
}