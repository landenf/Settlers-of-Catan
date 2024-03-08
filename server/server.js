const express = require('express');
const app = express();
const port = 5000;
const WebSocket = require('ws');

app.get("/test", (req, res) => {
    res.json({"users": ["userone","usertwo"]})
});


const server = app.listen(port, () => {console.log("Server Started")} );

const wss = new WebSocket.Server({  server: server  });

server.on('upgrade', (req, socket, head) => {
    // perform auth
    if (!req.headers['BadAuth']) {
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
        return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
    });
});

wss.on('connection', (ws, req) => {
    ws.send("hello!");
    ws.on('message', (msg, isBinary) => {
        // goes through each client and sends it
        wss.clients.forEach(() => {
            // checks if it is a different client and if the client is ready
            // to send to everyone, including yourself, take off ws !== client
            if(ws !== client && client.readyState === WebSocket.OPEN) {
                client.send(msg, { binary: isBinary});
            }
        });
    });

    // might need to include logic to close up the server
    ws.on('close', () => {
        console.log('Connection closed');
    });
});