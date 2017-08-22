$(document).ready(function(){
	function submitUser(){

		var newUser = {
			name: $("#name").val().trim(),
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		$.post("/signup", newUser, function(res){
			if(res.error) throw error;

			if(res.msg){
				$("#msg").text(res.msg);
				$("#email").focus();
			} else {
				window.location.href = "/dash";
			}
		});
	}

	$("#signupForm").validate({
		submitHandler: function(form) {
		    submitUser();
		},
		onkeyup: false,
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
				required: "Please provide your password.",
				minlength: "Your password must be at least 6 characters long."
			},
			confirmPassword: {
				required: "Please confirm your password.",
				minlength: "Your password must be at least 6 characters long.",
				equalTo: "Please enter the same password as above."
			}
		}
	});
})