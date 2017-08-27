// Passport npm doc http://passportjs.org/docs/overview

// Dependencies
var db = require("../models");

module.exports = function(app, passport){
	// Post route for sign in
	app.get("/api/bookmarks", function(req, res, next){
		db.Bookmarks.findAll({
      		where: {
        		UserId: req.user.id
      		},
      		include: [db.Snips]
    	}).then(function(result) {
      		res.json(result);
    	});
	});

		

	// Post route for sign up
	app.post("/api/bookmarks", function(req, res, next){
		
	});	
}