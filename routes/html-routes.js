// Dependencies
var path = require("path");

module.exports = function(app){
	// Get routes for home
	app.get('/', function(req, res){
 		res.sendFile(path.join(__dirname, "../public/index.html"));
 	});

 	// Get routes for global
	app.get('/global', function(req, res){
		// Only autenticated user can access this page
 		// If user is not autenticated, redirect to login
		if(req.isAuthenticated()){
 			res.sendFile(path.join(__dirname, "../private/global.html"));
 		} else {
 			res.redirect('/');
 		}
 	});

	// Get routes for dash
 	app.get('/dash', function(req, res){
 		// Only autenticated user can access this page
 		// If user is not autenticated, redirect to login
		if(req.isAuthenticated()){
 			res.sendFile(path.join(__dirname, "../private/dash.html"));
 		} else {
 			res.redirect('/');
 		}
 	});
}