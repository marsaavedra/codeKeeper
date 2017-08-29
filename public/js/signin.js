$(document).ready(function(){
	function loginUser(){
		// Create an object with input fields values
		var user = {
			email: $("#signInEmail").val().trim(),
			password: $("#signInPassword").val().trim()
		};

		// Post the user info to signin
		$.post("/signin", user, function(res){
			// Check response for error or messages

			if(res.error) throw error;

			if(res.msg){
				// If server responds with a message is because email or password is invalid
				// create a p tag, add error text, add class alert
				$('.alert').remove();
				var $p = $("<p>");
				$p.text("Invalid Email or Password.").addClass("alert alert-danger");

				// Append the p tag to div with id = msg
				$("#signInMsg").append($p);

				$("#signInEmail").focus();
			} else {
				// If login successfully redirect to dash page
				window.location.href = "/";
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
			signInEmail: {
				required: true
			},
			signInPassword: {
				required: true
			}
		},
		messages: {
			signInPassword: {
				required: "Please provide your email."
			},
			signInPassword: {
				required: "Please provide your password."
			},
		}
	});

	$("#signupButton").on("click", function(event){
		event.preventDefault();
		console.log("button")
		$("#signinDiv").fadeOut(500);
		setTimeout( 
			function(){ 
				$("#signupDiv").fadeIn(500);
			}, 500
		);

	});
})