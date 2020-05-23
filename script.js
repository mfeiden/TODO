
var addTask = function() {
  $.ajax({
    type: 'POST',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=160',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: $('#new').val()
      }
    }),
    success: function (response, textStatus) {
      var newTask = response.task.content;
       $('#list').append('<tr><td><label class="check"><input type="checkbox" class="mr-2"><span>' + newTask + '</span></label></td><td><button class="remove bg-white" style="border:none"><i class="far fa-trash-alt fa-sm"></i></button></td></tr>');
       $('#new').val('');
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  
  })
}





$(document).ready(function() {
  $('#new').on('keyup', function(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  
  
   $.ajax({
        type: 'GET',
        url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=160',
        dataType: 'json',
        success: function (response, textStatus) {
          console.log(response);
        },
        error: function (request, textStatus, errorMessage) {
          console.log(errorMessage);
        }
      })
  })
});