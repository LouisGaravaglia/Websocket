const express = require('express');
const app = express();
const server = require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({server: server})

wss.on('connection', function connection(ws) {
    console.log('A new client Connected');

    ws.isAlive = true;

    ws.on('pong', () => {
        ws.isAlive = true;
    });

    ws.send('Welcome New Client!');

    ws.on('message', function incoming(message) {
        console.log('received: %s', message);

        const broadcastRegex = /^broadcast\:/;

        if (broadcastRegex.test(message)) {
            message = message.replace(broadcastRegex, '');

            //send back the message to the other clients
            wss.clients
                .forEach(client => {
                    if (client != ws) {
                        client.send(`Hello, broadcast message -> ${message}`);
                    }    
                });

        } else {
            ws.send(`Hello, you sent -> ${message}`);
        }

        // ws.send('Got ur msg its:' + message);
    });

    setInterval(() => {
        wss.clients.forEach((ws) => {
    
            if (!ws.isAlive) return ws.terminate();
    
            ws.isAlive = false;
            ws.ping(null, false, true);
        });
    }, 10000);

});

app.get('/', (req, res) => res.send('Hello World from LG comp'))

server.listen(8999, () => console.log('listening on port: 8999'))