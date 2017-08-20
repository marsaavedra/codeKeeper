// Dependencies
var express = require('express');
var coder = require('../models/coder');

//Create all our routes
var router = express.Router();

router.post('/coder', function(req, res){
	
});

router.get('/', function(req, res){
	res.send('coder page');
});


// Export router
module.exports = router;