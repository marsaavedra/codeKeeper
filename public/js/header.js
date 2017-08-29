$(document).ready(function(){
	$("#logoTxt").text("</CodeKeeper/>");
});

$(".linkContainer").hover(       
        //what happens when you hover the card
        function(){ 
        	var linkName = $(this).attr("value"); 
      		console.log(linkName);
      		$("#navTxt").html(linkName);
      		$(this).css("filter", "grayscale(85%)");

        },
        // //what happens when you stop hovering the card
        function(){
          $("#navTxt").html("");
          $(this).css("filter", "grayscale(0)"); 
        }
 );