$(document).ready(function(){
	function loginUser(){
		// Create an object with input fields values
		var user = {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		// Post the user info to signin
		$.post("/signin", user, function(res){
			// Check response for error or messages

			if(res.error) throw error;

			if(res.msg){
				// If server responds with a message is because email or password is invalid
				// create a p tag, add error text, add class alert
				var $p = $("<p>");
				$p.text("Invalid Email or Password.").addClass("alert alert-danger");

				// Append the p tag to div with id = msg
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