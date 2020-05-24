var updateList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=160',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#list').empty();
      response.tasks.forEach(function (task) {
        $('#list').append('<tr><td><label class="check"><input type="checkbox" class="mr-2"><span>' + task.content + '</span></label></td><td><button class="remove bg-white" style="border:none"><i class="far fa-trash-alt fa-sm"></i></button></td></tr>');
      })
      console.log(response)
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

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
      updateList();
      $('#new').val('');
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

var removeTask = function(id) {
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=160',
    success: function (response, textStatus) {
      console.log(response);   
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  
  })

}




$(document).ready(function() {
  updateList();
  
  $('#new').on('keyup', function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      addTask();
    }
  })

});