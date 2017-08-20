$(document).ready(function(){
	function submitUser(){
		var newUser = {
			name: $("#name").val().trim(),
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		$.post("/coder/add", newUser, function(res){
			console.log(res);
		})
	}

	$("#signupForm").validate({
		submitHandler: function(form) {
		    submitUser();
		},
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
				required: "Please enter your user name.",
				minlength: "Your user name must be at least 6 characters long."
			},
			password: {
				required: "Please provide a password.",
				minlength: "Your password must be at least 6 characters long."
			},
			confirmPassword: {
				required: "Please provide a password.",
				minlength: "Your password must be at least 6 characters long.",
				equalTo: "Please enter the same password as above."
			}
		}
	});
})