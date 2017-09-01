$(document).ready(function(){
  var info;
 
  var currentPage = 1;

  var dataOutput = [];
  //set pages count to 0
  var pages = 0;

  var scope = 'user';
  var bookmark = false;

  getSnippets(scope);
  getBookmarks();

  setTimeout(function(){$("#signLink").show("slow");}, 100);
  setTimeout(function(){$("#globalLink").show("slow");}, 150);
  setTimeout(function(){$("#dashLink").show("slow");}, 200);
  setTimeout(function(){$("#snipLink").show("slow");}, 250);

  //--------------------------------------------------------------------------
  function pageNumber(data){
    currentPage = 1;
    //makes the offset by taking the page number and * it by 5 then - 5
    var offset = (currentPage * 5) - 5;
    pages = 0;
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
          
          dataOutput = data;
          pageNumber(dataOutput);   
      });
    }

  //--------------------------------- pagiBuild ------------------------------
  //              function for adding pagination to bottom of snippets

  function pagiBuild(pageCount){
    console.log(pages + " pages.");
    var contDiv = $("#pagiContainer");
    contDiv.html("");
    var link;
    
    //check to see if there is more than one page of results.
    //if there isn't we don't need to do anything
    if(pageCount > 1){

      //if you are on first page you don't need a previous link
      if(currentPage > 1){
        //create link
        //create div
        var prevPagi = $("<div>")
        .addClass("pagi")
        .attr("id", "previous")
        .attr("page", currentPage - 1)
        .html("<div class='txtDiv'><</div>");
        //place on page 
        contDiv.append(prevPagi);  
      } else {
        //create div
        var prevPagi = $("<div>")
        .addClass("empty")
        .attr("id", "previous")

        //place on page 
        contDiv.append(prevPagi); 
      }
      
      //loop for placing pagination on page
      for(var i = 1; i <= pageCount; i++){
        //if i = the page you are on style the div to show this
        if(i === currentPage){
          //create div
          var pagi = $("<div>")
          .addClass("pagi current")
          .attr("page", i)
          .html("<div class='txtDiv'>"+ i +"</div>");
          //place on page
          contDiv.append(pagi);
        } else {
    
          //create div
          var pagi = $("<div>")
          .addClass("pagi")
          .attr("page", i)
          .html("<div class='txtDiv'>"+ i +"</div>");
          //place on page
          contDiv.append(pagi);
        }

        if(i === pageCount){
          if(currentPage !== pageCount){
    
            //create div
            var nextPagi = $("<div>")
            .addClass("pagi")
            .attr("id", "next")
            .attr("page", currentPage + 1)
            .html("<div class='txtDiv'>></div>");
            //place on page 
            contDiv.append(nextPagi);
          } else {
            //create div
            var nextPagi = $("<div>")
            .addClass("empty")
            .attr("id", "next")
            //place on page 
            contDiv.append(nextPagi);
          }
        }
      }
      $(".pagi").click(pageClick);
    }
  }

//------------------------------------------------------------------------
//

  function pagiFunc(data, offset){
    var offsetData = {rows: []};
    for(var i = 0; i < 5; i++){

      if(data.rows[offset] !== undefined){
        offsetData.rows.push(data.rows[offset]);
      }
      offset++
    }
    console.log("current page: " + currentPage);
    console.log("Items on page: " + offsetData.rows.length);
    console.log(offsetData.rows.length);

    snipBuild(offsetData);       
  }

  //------------------------------------------------------------
  //

  function pageClick(){
      $("pagiContainer").html("");
      console.log($(this).attr("page"));
      currentPage = parseInt($(this).attr("page"));
      offset = (currentPage * 5) - 5;
      pagiBuild(pages);
      pagiFunc(dataOutput, offset)
  };


   //------------------------------------------------------------
  //
  function snipBuild(data){
      $("#snipArea").html("");
      info = [];
      if(data.rows){
          info = data.rows;
           bookmark = false;
      } else {
          info.push(data);
           bookmark = true;
      }
      
    for(var i = 0; i < info.length; i++){
     
      //create output for snippets
      var output =   "<div class='col-xs-12 box' id='box" + i + "'>\n";
      output +=      "  <div class='col-sm-4'>\n";
      output +=      "    <div class='col-sm-12 col-xs-12 topInfo'>\n";
      output +=      "      <h4 class='card-title'>"+info[i].title+"</h4>\n";
      output +=      "      <h5 class='card-title clickSearch'>"+info[i].language+"</h5>\n";            
      output +=      "    </div>\n";           
      output +=      "    <div class='col-sm-12 col-xs-12'>\n";
      output +=      "      <img src='/images/"+info[i].language+".png' class='snipImg'>\n";
      output +=      "    </div>\n";
      output +=      "      <div class='subInfo'>\n";
      output +=      "        <h6 class='card-subtitle mb-2 text-muted'>"+info[i].description+"</h6>\n";
      output +=      "        <h5 class='clickSearch'> "+info[i].User.name+"</h5>\n";       
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
          snip1.getSession().setMode("ace/mode/" + info[i].language);

          $("#box" + i).fadeIn("slow");


          createButtons(i, info[i].id);         
    }
    $(".clickSearch").on("click", function(){
      var searchThis = $(this).text().trim();
      search(searchThis);
    });
  }

  //----------------------------------------------------

    $("#searchButton").on("click", function(event){
        searchQuery = $("#searchInput").val().trim();
        search(searchQuery);
    });

    $('#searchInput').on('keyup', function(event){
        if(event.keyCode == 13) {
            searchQuery = $(this).val().trim();
            search(searchQuery);
        }
    });

//-------------------------------------------------------
function search(searchQuery){
    var newData = {rows: []};
    if(searchQuery !== ""){
        console.log("searching...");
        currentPage = 1;
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

      if(newData.rows.length > 0){
        dataOutput = newData; 
        pageNumber(dataOutput);
        
      } else {
        console.log("no results");
        $("#snipArea")
        .html("<div col-xs-12>No Results Found For " + searchQuery + "</div>"); 
      }
    });
  }

}

//----------------------------------------------------------------------------
        
    function createButtons(containerId, snipId){
        var $div = $('<div>').addClass('toolBar btn-group');
        $div.attr({'data-index': containerId, 'data-snipId': snipId});
        var $button = $('<button>').addClass('btn btn-default btn-xs bookmark');

        var $span = $('<i>').addClass('fa fa-bookmark-o ');
        $button.append($span).append(' Snip it');
        $div.append($button);

        if(scope == 'user' && bookmark == false){
            $button = $('<button>').addClass('btn btn-default btn-xs edit');
            $span = $('<i>').addClass('fa fa-pencil');
            $button.append($span).append(' Edit');
            $div.append($button);
        }

        $button = $('<button>').addClass('btn btn-default btn-xs copy');
        $span = $('<i>').addClass('fa fa-files-o');
        $button.append($span).append(' Copy');
        $div.append($button);

        $('#snip' + containerId).append($div);
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
        var id = $(this).parent().attr('data-index');
        copyToClipboard(info[id].snippet);
    });
//----------------------------------------------------------------

//---------------- Edit ------------------------------------------
  $(document).on('click', '.edit', function(){
      var id = $(this).parent().attr('data-index');
      
      $("#title").val(info[id].title);
      $("#description").val(info[id].description);
      $("#category").val(info[id].language);
      editor.getSession().setValue(info[id].snippet);
      $('#privacy').val(info[id].privacy);
      $('#snippet-id').val(info[id].id);
      $('#modal').modal('toggle');
  })

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
        $('#locationTxt').text('My Snippets');
        getSnippets('user');

        $("#logoImg").attr("src", "/images/dash.png");
    });

    // Get global snippets
    $('#snipGlobal').on('click', function(){
        scope = 'global';
        $('#locationTxt').text('Global Snippets');
        getSnippets('global');

        $("#logoImg").attr("src", "/images/global.png");
    });
//----------------------------------------------------------------

//--------------- Create Bookmarks  ------------------------------

  // Bookmark button click
  $(document).on("click", ".bookmark", function(){
      var snipId = $(this).parent().attr('data-snipId');
      var index = $(this).parent().attr('data-index');
     
      alert(index + ',  ' + snipId);
      $.get('/api/bookmarks/' + snipId, function(res){
          if(!res) {
            $('#bk-title').val(info[index].title);
            $('#bk-id').val(info[index].id);
            $('#bookmark-modal').modal();
          } else {
            $('#alert').modal();
          }
      });
      
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
          $("#pagiContainer").html("");
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
  $('#save').on('click', function(){
      $('.text-danger').remove();
      var title = $("#title").val().trim();
      if(title.length < 8){
          var $l = $('<label class="text-danger">').text('The title must be at least 8 characters long.');
          $("#title").after($l);
          return false;
      }

      var snippet = editor.getSession().getValue();
      if(snippet.length < 21){
          var $l = $('<label class="text-danger">').text('The snippet content must be at least 20 characters long.');
          $('#editor').after($l);
          return false;
      }

      var snipId = $('#snippet-id').val().trim();

      if(snipId == "") {
          var data = {
                  title: title,
                  description: $("#description").val().trim(),
                  language: $("#category").val().trim(),
                  snippet: snippet,
                  privacy: $('#privacy').val()
              };

          $.post('/api/snippets', data, function(res){
              clearFields();
          }); 
      } else {
          var data = {
                  id: snipId,
                  title: title,
                  description: $("#description").val().trim(),
                  language: $("#category").val().trim(),
                  snippet: snippet,
                  privacy: $('#privacy').val()
              };

          $.ajax({
            method: "PUT",
            url: "/api/snippets",
            data: data
          }).done(function(){
              clearFields();
          })
      }
  });
  
  function clearFields(){
    $("#title").val('');
    $("#description").val('');
    $("#category").val('text');
    editor.getSession().setValue('');
    $('#privacy').val('private');
    $('#modal').modal('toggle');
    getSnippets(scope);
  }
//---------------------------------------------------------------------
});