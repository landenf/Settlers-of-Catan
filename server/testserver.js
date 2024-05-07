const express = require('express')
const app = express()
const WebSocket = require('ws');

const server = app.listen(5000, '0.0.0.0', () => {console.log("Server Started")} )

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  console.log('Client connected');
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});

server.listen(5000, () => {
  console.log('Listening on %d', server.address().port);
});

app.get('/', (req, res) => {
    res.send('Hello Worlds!');
  });
