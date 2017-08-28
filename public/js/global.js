$(document).ready(function(){


  //grabs the URL grabs the string after ?
  var params = decodeURIComponent(window.location.search.substring(1));
  //takes is and splits it when it sees the =
  params = params.split("=");
  console.log(params[1]);
  var currentPage;

  if(params[1] === undefined){ 
    currentPage = 1;
  } else {
    currentPage = parseInt(params[1]);
  };
  console.log(currentPage);

  //makes the offset by taking the page number and * it by 5 then - 5
  var offset = (currentPage * 5) - 5;

//--------------------------------------------------------------------------
function pageNumber(data){
    //set pages count to 0
    var pages = 0;
    $("#snipArea").html("");

      //loop through adding a page by / snippet count by 5
      for(var i = 0; i < (data.rows.length / 5) ; i++){
        pages++
      } 

      console.log(pages + " pages.")
      pagiBuild(pages);
      pagiFunc(data, offset);
}

//--------------------------------------------------------------------------

$.get("/api/snippets/", function(data) {
    console.log("starting data: " + data.rows.length);
    pageNumber(data);   
}); 


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

//---------------------------------------------------------------------------

function pagiFunc(data, offset){
  var offsetData = {rows: []};
  for(var i = 0; i < 5; i++){
    if(data.rows[offset] !== undefined){
      offsetData.rows.push(data.rows[offset]);
    }
    offset++
  }
  console.log("offsetData: " + offsetData.rows.length)
  snipBuild(offsetData);       
}

//--------------------------------- pagiBuild ------------------------------
//                   function for adding snippets to the page

function snipBuild(data){
  var info = data.rows;

  for(var i = 0; i < info.length; i++){
   
    //create output for snippets
    var output =   "<div class='col-xs-12 box'>\n";
    output +=      "  <div class='col-sm-4'>\n";
    output +=      "    <div class='col-sm-12 col-xs-12 topInfo'>\n";
    output +=      "      <h4 class='card-title'>"+info[i].title+"</h4>\n";
    output +=      "      <h5 class='card-title language'>"+info[i].language+"</h5>\n";            
    output +=      "    </div>\n";           
    output +=      "    <div class='col-sm-12 col-xs-12'>\n";
    output +=      "      <img src='/images/"+info[i].language+".png' class='snipImg'>\n";
    output +=      "    </div>\n";
    output +=      "      <div class='subInfo'>\n";
    output +=      "        <h6 class='card-subtitle mb-2 text-muted'>"+info[i].description+"</h6>\n";
    output +=      "        By:<a href='#' class='card-link'> "+info[i].User.name+"</a>\n";       
    output +=      "        <a href='#' class='card-link'>Snips</a>\n";
    output +=      "      </div>\n";                 
    output +=      "    </div>\n";
    output +=      "    <div class='col-sm-8 snipBox' id='snip"+ i +"'>\n</div>\n";
    output +=      "</div>\n";
    output +=      "<div class='row'>\n";
    output +=      "  <div class='col-xs-12'>\n";
    output +=      "    <hr>\n";
    output +=      "  </div>\n";
    output +=      "</div>\n";

        //place on page
        $("#snipArea").append(output);

        var snip1 = ace.edit("snip" + i);
        snip1.getSession().setValue(info[i].snippet);
        snip1.setReadOnly(true);
        snip1.setTheme("ace/theme/dawn");
        snip1.getSession().setMode("ace/mode/text");
  }

  console.log(data)
}

//----------------------------------------------------

$("#searchButton").on("click", function(event){
  event.preventDefault();

    searchQuery = $(".searchInput").val().trim();
  search(searchQuery);
})

//-------------------------------------------------------
function search(searchQuery){
  
  var newData = {rows: []};
  if(searchQuery !== ""){
    console.log("searching...");

    $.get("/api/snippets/", function(data) {
      searchQuery = searchQuery.toLowerCase();
      searchQuery = searchQuery.split(" ");
    
      
      for(var i = 0; i < data.rows.length; i++){
        var currentID = parseInt(data.rows[i].id);

        var searchCheck = data.rows[i].title.split(" ");
        // searching by keywords in title
        for (var x = 0; x < searchCheck.length; x++){
          var word = searchCheck[x].toLowerCase();
          var usedCheck = false;
          for (var y = 0; y < searchQuery.length; y++){
            if(word == searchQuery[y]){
              console.log("keyword match: " + word);
              for(var z = 0; z < newData.rows.length; z++){
                if(currentID === parseInt(newData.rows[z].id)){
                  usedCheck = true;
                  console.log("title: " + data.rows[i].title);
                  console.log("used: " + usedCheck);
                }
              }
              if(usedCheck){ 
                usedCheck = false; 
              } else {
                console.log("title: " + data.rows[i].title);
                console.log("used: " + usedCheck);
                newData.rows.push(data.rows[i]);
              }
            }
          }
        }
        // search by language Catagory
        for(var x = 0; x < searchQuery.length; x++){
          if(data.rows[i].language === searchQuery[x]){
            console.log("language match: " + data.rows[i].language);
            var usedCheck = false;
            for(var y = 0; y < newData.rows.length; y++){
              if( currentID === newData.rows[y].id){
                usedCheck = true;
                console.log("title: " + data.rows[i].title);
                console.log("used: " + usedCheck);
              } 
            }
            if(usedCheck){ 
              usedCheck = false;
            } else {
              console.log("title: " + data.rows[i].title);
              console.log("used: " + usedCheck);
              newData.rows.push(data.rows[i]);
            }
          }
          //search by username
          if(data.rows[i].User.name.toLowerCase() == searchQuery[x].toLowerCase()){
            console.log("User match: " + data.rows[i].User.name);
            var usedCheck = false;
            for(var y = 0; y < newData.rows.length; y++){
              if(currentID === parseInt(newData.rows[y].id)){
                usedCheck = true;
                console.log("title: " + data.rows[i].title);
                console.log("used: " + usedCheck);
              } 
            }
            if(usedCheck){ 
              usedCheck = false;
            } else {
              console.log("title: " + data.rows[i].title);
              console.log("used: " + usedCheck);
              newData.rows.push(data.rows[i]);
            }
          }
        }
      }
      console.log(newData); 
      pageNumber(newData);
    });
  }

}

});