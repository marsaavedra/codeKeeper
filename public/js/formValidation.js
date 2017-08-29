  // Save bookmark button click
$(document).ready(function(){

  $('#save').on('click', function(){
      $('#snippetInput').val(editor.getSession().getValue());
      $("#snippetForm").submit();
  });

  // Bookmark form validation
  $("#snippetForm").validate({
      submitHandler: function(form) {
          submitSnippet();
      },
      onkeyup: false,
      errorClass: 'text-danger',
      rules: {
          "title": {
              required: true,
              minlength: 6
          },
          "snippet": {
              required: true,
              minlength: 20
          }
      },
      messages: {
          "title": {
              required: "Enter a title.",
              minlength: "Title must be at least 6 characters long."
          },
          "snippet": {
              required: "Enter a snippet.",
              minlength: "snippet must be at least 20 characters long."
          }
      }
  });

  // Save snippet to database
  function submitSnippet(){
       var data = {
              title: $("#title").val().trim(),
              description: $("#description").val().trim(),
              language: $("#category").val().trim(),
              snippet: $("#snippetInput").val(),
              privacy: $('#privacy').val()
          };

      $.post('/api/snippets', data, function(res){
          $("#title").val('');
          $("#description").val('');
          $("#category").val('text');
          editor.getSession().setValue('');
          $('#privacy').val('private');
          $('#modal').modal('toggle');
      }); 
  }
});