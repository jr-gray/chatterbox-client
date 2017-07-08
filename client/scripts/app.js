var app = {};

$('document').ready(function() { 
  
  app.init = function() {
    // app.handleSubmit();
    //app.handleUsernameClick();
    //$('#send .submit').on('click', this.handleSubmit);
    $('.username').on('click', this.handleUsernameClick);
  };

  app.server = 'http://parse.la.hackreactor.com/chatterbox/classes/messages';

  app.send = function(message) {

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      // url: 'http://parse.la.hackreactor.com/chatterbox/classes/messages',
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
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        var roomsArray = [];
        
        for (var i = 0; i < data.results.length; i++) {

          app.renderMessage(data.results[i]);
          if (!roomsArray.includes(data.results[i].roomname)) {
            roomsArray.push(data.results[i].roomname);
          }
        }
        for (var rooms = 0; rooms < roomsArray.length; rooms++) {
          var currentRoom = roomsArray[rooms];
          $('.differentRooms').append('<option value="' + currentRoom + '">' + currentRoom + '</option>');
        }
        app.init();

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

    message.username = this.sanitizeHTML(message.username);
    message.text = this.sanitizeHTML(message.text);
    $('#chats').append('<div class = "username"><b class="boldUser">' + '@' + message.username + '  ' + '</b>' + message.text + '</div>');

  };

  app.renderRoom = function(name) {
    $('#roomSelect').append('<span>' + name + '</span>');
  };
  

  var friends = {};

  app.handleUsernameClick = function() {  
    var usrAndMessage = $(this).text();
    var usrOnly = usrAndMessage.slice(1, usrAndMessage.indexOf(' '));
    if (!friends[usrOnly]) {
      friends[usrOnly] = usrOnly;
      $('#friendsList').append('<li>' + friends[usrOnly] + '</li>');
    }
    
  };

  app.handleSubmit = function() {
    // $('.submit').submit(function(e) {
    //   alert($(this).val());
    // });
    var message = {};
    message.username = window.location.search.substring(window.location.search.indexOf('=') + 1);
    // console.log(message.username);
    message.text = $('#sendMessage').val();
    message.roomname = 'lobby';
    app.send(message);
    //app.fetch()
    return false;
    
  };

  app.sanitizeHTML = function(s) {
    if (s) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
    }
  };
  

  app.fetch();
  //app.init();

  // setTimeout(app.fetch.bind(app), 5000);

  $('#send .submit').on('click', app.handleSubmit);
  $('.username').on('click', app.handleUsernameClick);
   
});



