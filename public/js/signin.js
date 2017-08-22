$(document).ready(function(){
	function loginUser(){
		
		var user = {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		$.post("/signin", user, function(res){
			
			if(res.error) throw error;

			if(res.msg){
				$("#msg").text("Invalid Email or password.");
				$("#email").focus();
			} else {
				window.location.href = "/dash";
			}
		});
	}

	$("#signinForm").validate({
		submitHandler: function(form) {
		    loginUser();
		},
		onkeyup: false,
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