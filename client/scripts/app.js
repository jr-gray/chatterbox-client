var app = {};

$('document').ready(function() { 


  
  app.init = function() {};

  app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

  app.send = function(message) {
    //debugger
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });

  };

  app.fetch = function() {
    $.ajax({
        // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      //data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        var roomsArray = [];
        
        for (var i = data.results.length - 1; i > 0; i--) {
          //if ($('.differentRooms').find(data.results[i].roomname)) { $(.diff)}  
          

          app.renderMessage(data.results[i]);
          if (!roomsArray.includes(data.results[i].roomname)) {
            roomsArray.push(data.results[i].roomname);
          }
        }
        for (var rooms = 0; rooms < roomsArray.length; rooms++) {
          var currentRoom = roomsArray[rooms];
          $('.differentRooms').append('<option value="' + currentRoom + '">' + currentRoom + '</option>');
        }
        
        

        // target #roomSelect and add each room as a child
        console.log(data.results[data.results.length - 1]);
        console.log(data.results[0]);
          
       
        

        // something with data
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };

  app.clearMessages = function() {
    $('#chats').empty();
  };

  app.renderMessage = function(message) {
// console.log('thisis the message ', message)
    $('#chats').append('<div class = "username"><b>' + '@' + message.username + '  ' + '</b>' + message.text + '</div>');
  };

  app.renderRoom = function(name) {
    $('#roomSelect').append('<span>' + name + '</span>');
  };

  app.handleUsernameClick = function() {  
    console.log('username clicked');
  };

  app.handleSubmit = function() {
    //this.send(message);
  };

  app.fetch();
  app.init();
  // $('.username').on('click', app.handleUsernameClick);
  // $('#send .submit').on('click', this.handleSubmit);
   
});



