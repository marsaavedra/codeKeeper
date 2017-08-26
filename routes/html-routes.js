// Dependencies
var path = require("path");

module.exports = function(app){
	// Get routes for home
	app.get('/', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/index.html"));
 	});

	// Get routes for sign up
 	app.get('/signup', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signup.html"));
 	});

 	// Get routes for sign in
	app.get('/signin', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signin.html"));
 	});

 	// Get routes for global
	app.get('/global', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/global.html"));
 	});

	// Get routes for dash
 	app.get('/dash', function(req, res){
 		// Only autenticated user can access this page
 		// If user is not autenticated, redirect to login
		if(req.isAuthenticated()){
 			res.sendFile(path.join(__dirname, "../public/dash.html"));
 		} else {
 			res.redirect('/signin');
 		}
 	});
}