var bCrypt = require('bcrypt');

module.exports = function(passport, coder){
	var Coder = coder;
	var LocalStrategy = require('passport-local').Strategy;

	//serialize
	passport.serializeUser(function(coder, done){
		done(null, coder.id);
	});

	//deserialize user
	passport.deserializeUser(function(id, done) {
   	 	Coder.findById(id).then(function(coder) {
	        if (coder) {
	            done(null, coder.get());
	        } else {
	            done(coder.errors, null);
	        }
	    });
	});

	passport.use('signup', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},

		function(req, email, password, done){
			var generateHash = function(password){
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

			Coder.findOne({
				where: {
					email: email
				}
			}).then(function(coder){
				if(coder){
					return done(null, false, "That email is already taken."
					);
				} else {
					var coderPassword = generateHash(password);
					var data = {
						email: email,
						password: coderPassword,
						name: req.body.name,
					};
					
					Coder.create(data).then(function(newCoder, created){
					 	if(!newCoder){
					 		return done(null, false, null);
					 	} else {
					 		return done(null, newCoder, null);
					 	}
				 	});
				}
			});
		}
	));
}