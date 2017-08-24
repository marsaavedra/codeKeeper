$(document).ready(function(){
	function loginUser(){
		// Create an object with input fields values
		var user = {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		console.log(user);
		// Post the user info to signin
		$.post("/signin", user, function(res){
			// Check response for error or messages
			if(res.error) throw error;

			if(res.msg){
				// If server responds with a message is because email or password is invalid
				var $p = $("<p>");
				$p.text("Invalid Email or password.").addClass("alert alert-danger");

				$("#msg").append($p);

				$("#email").focus();
			} else {
				// If login successfully redirect to dash page
				window.location.href = "/dash";
			}
		});
	}

	$("#signinForm").validate({
		submitHandler: function(form) {
		    loginUser();
		},
		onkeyup: false,
		errorClass: 'text-danger',
		rules: {
			email: {
				required: true
			},
			password: {
				required: true
			}
		},
		messages: {
			email: {
				required: "Please provide your email."
			},
			password: {
				required: "Please provide your password."
			},
		}
	});
})