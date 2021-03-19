const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World from LG comp'))

app.ws('/chat', (ws, req) => {

    ws.send(JSON.stringify({"user":"ServerUser","message":"ServerMessage"}));
    ws.on('message', function(data) {
        console.log("MSG received on server");
        console.log("data", data);
        expressWs.getWss().clients.forEach(client => {
            if (client.readyState === 1) {
                client.send(data);
            }
        })
    })
})

app.listen(3000, () => console.log('listening on port: 3000'))