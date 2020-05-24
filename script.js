// function to update html
var updateList = function() {
  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=160',
    dataType: 'json',
    success: function (response, textStatus) {
      $('#list').empty();
      response.tasks.forEach(function (task) {
        $('#list').append('<tr><td class="col-11"><label><input type="checkbox" class="check mr-2" data-id="' + task.id + '"' + (task.completed ? 'checked' : '') + '><span>' + task.content + '</span></label></td><td><button class="remove bg-white" style="border:none" data-id="' + task.id + '"><i class="far fa-trash-alt fa-sm"></i></button></td></tr>');
      })
      console.log(response)
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });
}

// functions to add / delete tasks
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
  })
};

var removeTask = function(id) {
  id = $(this).data('id');
  $.ajax({
    type: 'DELETE',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '?api_key=160',
    success: function (response, textStatus) {
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
};

//functions to update task status
var completed = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_complete?api_key=160',
    dataType: 'json',
    success: function (response, textStatus) {
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
};

var open = function(id) {
  $.ajax({
    type: 'PUT',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/' + id + '/mark_active?api_key=160',
    dataType: 'json',
    success: function (response, textStatus) {
      updateList();
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  })
};



// event handlers
$(document).ready(function() {
  
  updateList();

  $(document).on('click', '.remove', removeTask);

  $(document).on('change', '.check', function() {
    if (this.checked) {
      completed($(this).data('id'));
    } else {
      open($(this).data('id'));
    }
  });
  
  $('#new').on('keyup', function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
      addTask();
    }
  });

});