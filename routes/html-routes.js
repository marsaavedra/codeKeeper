// Dependencies
var path = require("path");

module.exports = function(app){
	// Get routes for dash
 	app.get('/', function(req, res){
 		// Only autenticated user can access this page
 		// If user is not autenticated, redirect to login
		if(req.isAuthenticated()){
 			res.sendFile(path.join(__dirname, "../private/index.html"));
 		} else {
 			res.redirect('/signin');
 		}
 	});

 	// Get routes for home
	app.get('/signin', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/signin.html"));
 	});

}