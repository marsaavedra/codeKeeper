$(document).ready(function(){

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/dawn");
    editor.getSession().setMode("ace/mode/text");
    //chrome, crimson_editor, dawn, github, 

    $('#add-new').on("click", function(){
        $('#modal').modal({
            keyboard: false
        });
    });

    $('#category').on('change', function(){
        editor.getSession().setMode("ace/mode/" + $(this).val());
    });

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
});