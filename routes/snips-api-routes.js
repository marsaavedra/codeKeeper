var db = require("../models");
var path = require("path");
// Routes
// =============================================================
module.exports = function(app) {
  app.get("/test", function(req, res) {
    res.sendFile(path.join(__dirname, "../test/test.html"));
  });

  // GET route for getting all of the snippets
  app.get("/api/snippets", function(req, res) {
    db.Snips.findAll({
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
      include: [db.Coder]
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
      status: req.body.status,
      liked: req.body.liked,
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
