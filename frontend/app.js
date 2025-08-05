const socket = new WebSocket('wss://3h2jl37y0g.execute-api.eu-north-1.amazonaws.com/dev/');

socket.onopen = () => {
  console.log("Connected to WebSocket");
};

socket.onmessage = (event) => {
  const chatBox = document.getElementById('chat-box');
  const message = document.createElement('div');
  message.textContent = event.data;
  chatBox.appendChild(message);
};

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value;
  if (message.trim() !== '') {
    socket.send(JSON.stringify({ action: 'sendMessage', data: message }));
    input.value = '';
  }
}
