const input = document.getElementById('msg');
const msgContainer = document.getElementById('messages');
const socket = io();

input.addEventListener('keydown', function(event) {
  if (event.key === "Enter") {

    if (this.value !== "") {
      socket.emit('send_message', this.value);
      // let newMsg = document.createElement('li');
      // newMsg.textContent = this.value;
      // msgContainer.appendChild(newMsg);
      this.value = "";
    }
  }
});

socket.on('new_message', (msg) => {
  let newMsg = document.createElement('li');
  newMsg.textContent = msg;
  msgContainer.appendChild(newMsg);
});