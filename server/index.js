const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
    console.log('connection');

    socket.on('disconnect', () => {
        console.log('disconnect');
    });
});

app.use(router);

server.listen(PORT, () => console.log('listening on port ' + PORT));