// Dependencies
var db = require("../models");

module.exports = function(app){
	app.get('/coder', function(req, res){
 		res.send('coder page'); // testing
 	});

 	app.post('/coder/add', function(req, res){
 		//var user: {
 		//	userName: req.body. 
 		//}
 		console.log(req.body.name);
 		console.log(req.body.email);
 		console.log(req.body.password);
 		res.send('ok'); // testing
 	});
}