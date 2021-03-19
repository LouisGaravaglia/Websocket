const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World from LG comp'))

app.ws('/chat', (ws, req) => {
    //SENDING WELCOME MESSAGE WHEN USER FIRST VISITS /CHAT ROUTE
    ws.send(JSON.stringify({"user":"Admin","message":"Welcome to the chat!"}));
    ws.on('message', function(data) {
        //RELAYS THE MESSAGE THAT ANY USER SENDS TO EACH CLIENT BROWSER SO THAT IT CAN BE APPENDED TO THE DOM
        expressWs.getWss().clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(data);
            }
        })
    })
})

app.listen(3000, () => console.log('listening on port: 3000'))