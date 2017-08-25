$(document).ready(function(){
	function submitUser(){
		// Create an object with input fields values
		var newUser = {
			name: $("#name").val().trim(),
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		// Post the user info to signup
		$.post("/signup", newUser, function(res){
			// Check response for error or messages
			if(res.error) throw error;

			if(res.msg){
				// If server responds with a message is because email already exist
				// create a p tag, add error text, add class alert
				var $p = $("<p>");
				$p.text("That email is already taken.").addClass("alert alert-danger");

				// Append the p tag to div with id = msg
				$("#msg").append($p);
				$("#email").focus();
			} else {
				// If singup successfully redirect to dash page
				window.location.href = "/dash";
			}
		});
	}

	$("#signupForm").validate({
		submitHandler: function(form) {
		    submitUser();
		},
		onkeyup: false,
		errorClass: 'text-danger',
		rules: {
			name: {
				required: true,
				minlength: 6
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6
			},
			confirmPassword: {
				required: true,
				minlength: 6,
				equalTo: "#password"
			}
		},
		messages: {
			name: {
				required: "Enter your user name.",
				minlength: "Your user name must be at least 6 characters long."
			},
			email:{
				required: "Enter your email address.",
				email: "Enter a valid email address"
			},
			password: {
				required: "Enter your password.",
				minlength: "Password must be at least 6 characters."
			},
			confirmPassword: {
				required: "Confirm your password.",
				minlength: "Password must be at least 6 characters.",
				equalTo: "Enter the same password as above."
			}
		}
	});
})