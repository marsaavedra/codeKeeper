var db = require("../models");
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {

  // Get route for retrieving all snippets of a specific user
  app.get("/api/snippets/user/:user", function(req, res) {
    db.User.findAll({
      where: {
        name: req.params.user
      },
      include: [{
        model: db.Snips,
        where: { privacy: "public"}
      }]

    }).then(function(result) {
      res.json(result);
    });
  });

  // GET route for pagination of the snippets
  app.get("/api/snippets/pagination/:offset", function(req, res) {
    console.log(req.params.offset)
    db.Snips.findAndCountAll({
      offset: parseInt(req.params.offset),
      limit: 5,

      include: [db.User]
    }).then(function(result) {
      res.json(result);
    });
  });

  // GET route for getting all of the snippets
  app.get("/api/snippets", function(req, res) {
    db.Snips.findAndCountAll({
      include: [db.User]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get route for retrieving all snippets of a specific language
  app.get("/api/snippets/category/:language", function(req, res) {
    db.Snips.findAll({
      where: {
        language: req.params.language
      },
      include: [db.User]
    }).then(function(result) {
      res.json(result);
    });
  });

  // Get route for retrieving a single snippet
  app.get("/api/snippets/:id", function(req, res) {
    db.Snips.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(result) {
      res.json(result);
    });
  });

  // POST route for saving a new snippet
  app.post("/api/snippets", function(req, res) {
    
    db.Snips.create({
      title: req.body.title,
      description: req.body.description,
      snippet: req.body.snippet,
      language: req.body.language,
      privacy: req.body.privacy,
      UserId: req.user.id
    }).then(function(result) {
      res.json(result);
    });
  });

  // DELETE route for deleting snippet
  app.delete("/api/snippets/:id", function(req, res) {
    db.Snips.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(result) {
      res.json(result);
    });
  });

  // PUT route for updating snippet
  app.put("/api/snippets", function(req, res) {
    db.Snips.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(result) {
        res.json(result);
      });
  });
};
