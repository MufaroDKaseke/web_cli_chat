const input = document.getElementById('msg');
const msgContainer = document.getElementById('messages');
const usernameContainer = document.querySelector('.username');
const socket = io();


  // Check is a username exist before starting
  
  window.addEventListener('load', function() {
    if (localStorage.getItem('user') === null) {
      usernameContainer.textContent = "Please set a username : ";
      console.log("Some");
      input.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
          localStorage.setItem('user', this.value)
        }
      });  
    }
  });
  
  // Set username
  usernameContainer.textContent = localStorage.getItem('user') + ' >';
  
  // Send message on enter
  input.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
      
      if (this.value !== "") {
        socket.emit('send_message', this.value);
        this.value = "";
      }
    }
  });
  
  // On new message
  socket.on('new_message', (msg) => {
    let newMsg = document.createElement('li');
    newMsg.textContent = msg;
    msgContainer.appendChild(newMsg);
  });