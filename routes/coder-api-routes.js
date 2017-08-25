// Passport npm doc http://passportjs.org/docs/overview

// Dependencies
var db = require("../models");

module.exports = function(app, passport){
	// Post route for sign in
	app.post("/signin", function(req, res, next){
		// authenticate the user
		passport.authenticate("signin", function(err, user, msg){
			if(user){
				// If user sign in successfully, establish a session and send a response.
			 	req.logIn(user, function(){
			 		return res.json(user);
			 	});
			} else {

				// If authentication fail, send a response object with any error or messages.
				var data = {
				 		error: err,
				 		msg: msg
					}

				return res.json(data);	
			}
		})(req, res, next);
	});

	// Post route for sign up
	app.post("/signup", function(req, res, next){
		passport.authenticate("signup", function(err, user, msg){
			if(user){
				// If user is created successfully, establish a session and send a response.
			 	req.logIn(user, function(){
			 		return res.json(user);
			 	});
			} else {
				// send a response object with any error or messages.
				var data = {
					error: err,
					msg: msg
				}
				return res.json(data);
			}
		})(req, res, next);
	});	

	// Get route for log out
	app.get('/logout', function(req, res) {
		// Call passport logout funtion to remove the req.user property and clear the login session
  		req.logout();
  		// Redirect to home
  		res.redirect('/');
	});
}