const socket = new WebSocket('wss://YOUR-API-GATEWAY-ENDPOINT');

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
