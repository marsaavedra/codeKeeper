// Dependencies
var bCrypt = require('bcrypt');

module.exports = function(passport, user){
	var User = user;

	//Local strategy for username/password authentication
	var LocalStrategy = require('passport-local').Strategy;

	// In order to support login sessions, Passport will serialize and deserialize 
	// user instances to and from the session.
	// Here, the user ID is serialized to the session. 
	// When subsequent requests are received, this ID is used to find the user
	// which will be restored to req.user
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});

	// deserialize user
	passport.deserializeUser(function(id, done) {
   	 	User.findById(id).then(function(user) {
	        if (user) { 
	            done(null, user.get());
	        } else {
	            done(user.errors, null);
	        }
	    });
	});

	// sign up strategy
	passport.use('signup', new LocalStrategy(
		// The verify callback for local authentication accepts username and password arguments by default.
		// Set what request fields our usernameField and passwordField are.
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true // aloows us to pass the entire request to the callback "done"
		},

		function(req, email, password, done){
			// The hashed password generating function
			// Param password and return a hashed password
			var generateHash = function(password){
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

			// Check if the emial already exist in the database
			User.findOne({
				where: {
					email: email
				}
			}).then(function(user){
				if(user){
					// If email exist return a message
					return done(null, false, "That email is already taken.");
				} else {
					// get a hashed password
					var userPassword = generateHash(password);
					// Create an object with user info
					var data = {
						email: email,
						password: userPassword,
						name: req.body.name,
					};
					// Insert user in database
					User.create(data).then(function(newUser, created){
					 	if(!newUser){
					 		return done(null, false, null);
					 	} else {
					 		return done(null, newUser, null);
					 	}
				 	});
				}
			});
		}
	));

	//Signin strategy
	passport.use('signin', new LocalStrategy(
		// Set what request fields our usernameField and passwordField are.
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},

		function(req, email, password, done){
			var User = user;

			// Function to compare password entered with the one in database
			var isValidPassword = function(userpass, password){
				return bCrypt.compareSync(password, userpass);
			}

			// Check if the emial exist in the database
			User.findOne({
				where: {
					email: email
				}
			}).then(function(user){

				if(!user) {
					// If user does not exist
					return done(null, false, "Email does not exist.");
				}
				// Validate password
				if(!isValidPassword(user.password, password)){
					return done(null, false, "Incorrect password.");
				}

				// If the user exist and password is correst
				// get user info
				var userinfo = user.get();

				// Return user info
				return done(null, userinfo);
			});
		}

	));
}