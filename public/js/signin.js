$(document).ready(function(){
	$("#submit").on("click", function(e){
		e.preventDefault();

		var data = {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};

		$.post("/signin", data, function(res){
			if(res.error) throw error;

			if(res.msg){
				$("#msg").text("Invalid Email or password.");
				$("#email").focus();
			} else {
				window.location.href = "/dash";
			}
		});
	});
})