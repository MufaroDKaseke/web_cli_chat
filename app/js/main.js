class Chat {
  constructor() {
    // Set elements
    this.input = document.getElementById('msg');
    this.msgContainer = document.getElementById('messages');
    this.usernameContainer = document.querySelector('.username');

    this.setUsername();
    this.socket = io();


  }

  setUsername() {
    if (localStorage.getItem('user') === null) {
      this.username = prompt('Please set a username :').trim();
      localStorage.setItem('username', this.username);
      this.usernameContainer.textContent = '@' + this.username + ' > ';
    } else {
      this.username = localStorage.getItem('user');
      this.usernameContainer.textContent = '@' + this.username + ' > ';
    }
  }


  startChat() {
    let socket = this.socket;
    let username = this.username;

    // Send Message On Enter
    this.input.addEventListener('keydown', function(event) {
      if (event.key === "Enter") {
        if (this.value !== "") {
          // Message object
          let message = {
            user: username,
            content: this.value
          };

          socket.emit('send_message', JSON.stringify(message));
          this.value = "";
        }
      }
    });

    // On new message
    this.socket.on('new_message', (msg) => {
      let newMsg = document.createElement('li');
      let message = JSON.parse(msg)
      newMsg.textContent = message.user + ' : ' + message.content;
      this.msgContainer.appendChild(newMsg);
    });
  }
}