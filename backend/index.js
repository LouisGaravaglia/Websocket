const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
app.use(express.static(__dirname + '/public'));

// const ws = new WebSocket('ws://localhost:3000/chat');
// ws.onmessage = function(data) {
//     console.log("MSG received on server");
// }

app.get('/', (req, res) => res.send('Hello World from LG comp'))

app.ws('/chat', (ws, req) => {
    ws.send("HELLO FROM SERVER")
    ws.on('message', function(data) {
        console.log("MSG received on server");
    })
})

app.listen(3000, () => console.log('listening on port: 3000'))