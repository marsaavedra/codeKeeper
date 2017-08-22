// Dependencies
var db = require("../models");
var path = require("path");

module.exports = function(app, passport){
	app.get('/dash', function(req, res){
		if(req.isAuthenticated()){
 			res.sendFile(path.join(__dirname, "../public/dash.html"));
 		} else {
 			res.sendFile(path.join(__dirname, "../public/signin.html"));	
 		}
 	});

	app.get('/signup', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signup.html"));
 	});

	app.get('/signin', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signin.html"));
 	});

	app.post("/signin", function(req, res, next){
		passport.authenticate("signin", function(err, user, msg){
			if(user){
			 	req.logIn(user, function(){
			 		return res.json(user);
			 	});
			}

			 var data = {
			 	error: err,
			 	user: user,
			 	msg: msg
			 }

			return res.json(data);	
		})(req, res, next);
	});

	app.post("/signup", function(req, res, next){
		passport.authenticate("signup", function(err, user, msg){
			var data = {
				error: err,
				user: user,
				msg: msg
			}
			return res.json(data);
		})(req, res, next);
	});	

	app.get('/logout', function(req, res) {
  		req.logout();
  		res.redirect('/');
	});
}