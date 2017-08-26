$(document).ready(function(){
  //grabs the URL grabs the string after ?
  var params = decodeURIComponent(window.location.search.substring(1));
  //takes is and splits it when it sees the =
  params = params.split("=");

  var currentPage = parseInt(params[1]);

  //makes the offset by taking the page number and * it by 5 then - 5
  var offset = (currentPage * 5) - 5;

  //set pages count to 0
  var pages = 0;

function pageNumber(){
   get the count of snippets
   $.get("/api/snippets/", function(data) {
      //loop through adding a page by / snippet count by 5
      for(var i = 0; i < (data.rows.length / 5) ; i++){
        pages++
      } 
      console.log(pages + " pages.")
      pagiBuild(pages);
      pagiFunc(offset);
    });
   
}

pageNumber();

//--------------------------------- pagiBuild ------------------------------
//              function for adding pagination to bottom of snippets

function pagiBuild(pageCount){

  var contDiv = $("#pagiContainer");
  var link;
  //check to see if there is more than one page of results.
  //if there isn't we don't need to do anything
  if(pageCount !== 1){

    //if you are on first page you don't need a previous link
    if(currentPage !== 1){
      //create link
      link = "<a href='/test?page=";
      link += currentPage -1;
      link += "'><</a>";
      //create div
      var prev = $("<div>")
      .addClass("pagi")
      .attr("id", "previous")
      .append(link);
      //place on page 
      contDiv.append(prev);  
    }
    
    //loop for placing pagination on page
    for(var i = 1; i <= pageCount; i++){
      //if i = the page you are on style the div to show this
      if(i === currentPage){
        //create link
        link = "<a href='/test?page="+i+"'>"+i+"</a>";
        //create div
        var pagi = $("<div>")
        .addClass("pagi current")
        .append(link);
        //place on page
        contDiv.append(pagi);
      } else {
        //create link
        link = "<a href='/test?page="+i+"'>"+i+"</a>";
        //create div
        var pagi = $("<div>")
        .addClass("pagi")
        .append(link);
        //place on page
        contDiv.append(pagi);
      }
    }
  }
}

function pagiFunc(offset){
     $.get("/api/snippets/pagination/" + offset, function(data) {
      snipBuild(data);    
    });
}

function snipBuild(data){
  var info = data.rows;
  for(var i = 4; i < info.length; i++){
    //create link
       var output = "<div class='col-lg-12'>\n";
       output += "  <div class='text-center' id='categoryOutput'>\n";
       output += "    <h2 class='card-title'>" + info[i].language + "</h2>\n";
       output += "    <img src='/images/" + info[i].language + ".png' id='snipImg'>\n";
       output += "  </div>\n";
       output += "  <h4 class='card-title'>" + info[i].title + "</h4>\n";
       output += "  <h6 class='card-subtitle mb-2 text-muted'>" + info[i].description + "</h6>\n";
       output += "   <div id='editor' class='snipTxt"+ i +"'></div>\n";
       output += "  <a href='#'' class='card-link'>" + info[i].User.name + "</a>\n";
       output += "  <a href='#' class='card-link'>Snips</a>\n</div>";      
            

        //place on page
        // $("#snipArea").append(output);


        $(".ace_text-layer").text(info[i].snippet);
        console.log(output);
  }

  console.log(data)
}


});