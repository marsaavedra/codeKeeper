$(document).ready(function(){
  var info;

   //grabs the URL grabs the string after ?
  var params = decodeURIComponent(window.location.search.substring(1));
  //takes is and splits it when it sees the =
  params = params.split("=");
 
  var currentPage;

  if(params[1] === undefined){ 
    currentPage = 1;
  } else {
    currentPage = parseInt(params[1]);
  };
 

    //makes the offset by taking the page number and * it by 5 then - 5
    var offset = (currentPage * 5) - 5;

    var info;

    var scope = 'user';
    getSnippets(scope);
    getBookmarks();

    //--------------------------------------------------------------------------
    function pageNumber(data){
        //set pages count to 0
        var pages = 0;
        

          //loop through adding a page by / snippet count by 5
          for(var i = 0; i < (data.rows.length / 5) ; i++){
            pages++
          } 
          pagiBuild(pages);
          pagiFunc(data, offset);
    }

//--------------------------------------------------------------------------

    function getSnippets(scope){
        $.get("/api/snippets/" + scope, function(data) {
            pageNumber(data);   
        });
    }

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


function snipBuild(data){
    $("#snipArea").html("");
    info = [];
    if(data.rows){
        info = data.rows;
    } else {
        info.push(data);
    }
  for(var i = 0; i < info.length; i++){
   
    //create output for snippets
    var output =   "<div class='col-xs-12 box' id='box-" + i + "'>\n";
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
    output +=      "    <div class='col-sm-8 snipBox' id='snip"+ info[i].id +"'>\n</div>\n";
    output +=      "</div>\n";
    output +=      "<div class='row'>\n";
    output +=      "  <div class='col-xs-12'>\n";
    output +=      "    <hr>\n";
    output +=      "  </div>\n";
    output +=      "</div>\n";

        //place on page
        $("#snipArea").append(output);

        var snip1 = ace.edit("snip" + info[i].id);
        snip1.getSession().setValue(info[i].snippet);
        snip1.setReadOnly(true);
        snip1.setTheme("ace/theme/dawn");
        snip1.getSession().setMode("ace/mode/" + info[i].language);

        createButtons(i);
  }
}

//----------------------------------------------------

    $("#searchButton").on("click", function(event){
        event.preventDefault();

        searchQuery = $("#searchInput").val().trim();
        search(searchQuery);
    })

//---------------------------------------------------------

    $(".snipImg").on("click", function(event){
     
        console.log("langue search value: " + this.val())
        searchQuery = this.val();
        search(searchQuery);
    })

//-------------------------------------------------------
function search(searchQuery){
    var newData = {rows: []};
    if(searchQuery !== ""){
        console.log("searching...");

        $.get("/api/snippets/" + scope, function(data) {
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
        
    function createButtons(id){
        var $div = $('<div>').addClass('toolBar btn-group');
        $div.attr('data-id', id);
        var $button = $('<button>').addClass('btn btn-default btn-xs bookmark');

        var $span = $('<i>').addClass('fa fa-bookmark-o ');
        $button.append($span).append(' Snip it');
        $div.append($button);

        if(scope == 'user'){
            $button = $('<button>').addClass('btn btn-default btn-xs');
            $span = $('<i>').addClass('fa fa-pencil');
            $button.append($span).append(' Edit');
            $div.append($button);
        }

        $button = $('<button>').addClass('btn btn-default btn-xs copy');
        $span = $('<i>').addClass('fa fa-files-o');
        $button.append($span).append(' Copy');
        $div.append($button);

        $('#box-' + id).append($div);
    }
//--------------------  Copy to clipboard  --------------------------------------------
    //Copy a value to the clipboard
    function copyToClipboard(value) {
        var $temp = $("<textarea>");
        $("body").append($temp);
        $temp.val(value).select();

        document.execCommand("copy");
        $temp.remove();
    }

    //Button copy click event
    //Get snippet text from the parent editor and call copyToClipboard function with that value
    $(document).on('click', '.copy', function(){
        var id = $(this).parent().attr('data-id');
        copyToClipboard(info[id].snippet);
    });
//----------------------------------------------------------------

// ---------------  Navbar Buttons  ------------------------------

    // Creat new snippet
    $('#add-new').on("click", function(){
        $('#modal').modal({
            keyboard: false
        });
    });

    // Get user snippets
    $('#snipUser').on('click', function(){
        scope = 'user';
        getSnippets('user');
    });

    // Get global snippets
    $('#snipGlobal').on('click', function(){
        scope = 'global';
        getSnippets('global');
    });
//----------------------------------------------------------------

//--------------- Create Bookmarks  ------------------------------

  // Bookmark button click
  $(document).on("click", ".bookmark", function(){
      var id = $(this).parent().attr('data-id');
      $('#bk-title').val(info[id].title);
      $('#bk-id').val(info[id].id);
      $('#bookmark-modal').modal();
  });

  // Save bookmark button click
  $('#save-bk').on('click', function(){
      $("#bookmarkForm").submit();
  });

  // Bookmark form validation
  $("#bookmarkForm").validate({
      submitHandler: function(form) {
          submitBookmark();
      },
      onkeyup: false,
      errorClass: 'text-danger',
      rules: {
          "bk-title": {
              required: true,
              minlength: 10
          }
      },
      messages: {
          "bk-title": {
              required: "Enter a title.",
              minlength: "Title must be at least 10 characters long."
          }
      }
  });

  // Save bookmark to database
  function submitBookmark(){
      // Create an object with input fields values
      var newBookmark = {
          SnipId: $("#bk-id").val().trim(), 
          title: $("#bk-title").val().trim()
      };

      // Post the user info to signup
      $.post("/api/bookmarks", newBookmark, function(res){
          // Check response for error or messages
          if(res.error) throw error;

          $('#bookmark-modal').modal( 'hide' ).data( 'bs.modal', null );

          $('#tooltip').tooltip('show');
           setTimeout( 
              function(){ 
                  $('#tooltip').tooltip('hide');;
              }, 2000
          );
      });
  }
//----------------------------------------------------------------

//-------------  Get bookmarks  ----------------------------------
  // Get bookmarks from database
  function getBookmarks(){
       $.get("/api/bookmarks", function(data) {
          var ulBookmarks = $('#bookmarkList');
          if(data){
              for(var i = 0; i < data.length; i++){
                   var $li = $('<li>');
                   var $a = $('<a href="#">').text(data[i].title);
                   $a.attr('data-snipId', data[i].SnipId).addClass('bookmark-link');
                   $li.append($a);
                   ulBookmarks.append($li);
              }
          }   
      });
  }

  // Bookmark link click
  $(document).on('click', '.bookmark-link', function(){
      var snipId = $(this).attr('data-snipId');

      $.get("/api/snippets/one/" + snipId, function(data) {
          snipBuild(data); 
      });
  });
//------------------------------------------------------------------------
    

    

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/dawn");
    editor.getSession().setMode("ace/mode/text");
    //chrome, crimson_editor, dawn, github, 

    

    $('#category').on('change', function(){
        editor.getSession().setMode("ace/mode/" + $(this).val());
    });
//----------------- Snippets --------------------------------------------
  // Save button click event
  $('#save').on('click', function(){
      console.log($('#privacy').val());
      var data = {
              title: $("#title").val().trim(),
              description: $("#description").val().trim(),
              language: $("#category").val().trim(),
              snippet: editor.getSession().getValue(),
              privacy: $('#privacy').val()
          };

      $.post('/api/snippets', data, function(res){
          $("#title").val('');
          $("#description").val('');
          $("#category").val('');
          editor.getSession().setValue('');
          $('#privacy').val('');
          $('#modal').modal('toggle');
      }); 
  });
//---------------------------------------------------------------------
});

