const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.send('Hello World From Express Server'))

app.get("/discover", (req, res) => {
    console.log("hit discover");
})

// app.get('/chat/:roomName', (req, res) => {
//     const chatRoomName = req.params.roomName;
//     console.log('hit params route: ', req.params.roomName);

//     app.ws(`chat/${chatRoomName}`, (ws, req) => {
//         console.log('hit chat in backend');
//         //SENDING WELCOME MESSAGE WHEN USER FIRST VISITS /CHAT ROUTE
//         ws.send(JSON.stringify({"user":"Admin","message":"Welcome to the chat!"}));
//         ws.on('message', function(data) {
//             //RELAYS THE MESSAGE THAT ANY USER SENDS TO EACH CLIENT BROWSER SO THAT IT CAN BE APPENDED TO THE DOM
//             expressWs.getWss().clients.forEach(client => {
//                 if (client.readyState === 1) {
//                     client.send(data);
//                 }
//             })
//         })
//     })
// })

app.ws('/chat/:roomName', (ws, req) => {
    console.log('hit chat in backend');
    console.log('hit params route: ', req.params.roomName);
    var url = req.url;
    console.log('url is: ', url);
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