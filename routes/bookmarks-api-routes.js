// Passport npm doc http://passportjs.org/docs/overview

// Dependencies
var db = require("../models");

module.exports = function(app, passport){
	// get route bookmarks
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

	// get route bookmarks
  app.get("/api/bookmarks/:id", function(req, res, next){
    db.Bookmarks.findOne({
          where: {
            id: req.params.id,
            UserId: req.user.id
          }
      }).then(function(result) {
          res.json(result);
      });
  });


	// Post route bookmarks
	app.post("/api/bookmarks", function(req, res, next){
		db.Bookmarks.create({
      		title: req.body.title,
      		SnipId : req.body.SnipId,
      		UserId: req.user.id
    	}).then(function(result) {
      		res.json(result);
    	});
	});	
}