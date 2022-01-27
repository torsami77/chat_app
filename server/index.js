const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        method: ['GET', 'POST'],
    }
})

io.on('connection', (socket) => {
    console.log(`User conneccted: ${socket.id}`);

    socket.on('join_room', (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on('send_message', (data)=> {
        socket.to(data.room).emit('receive_message', data);
    })

    socket.on('disconnect', () => {
        console.log('User Disconnected', socket.id);
    })
})

server.listen(5000, () => {
    console.log('running on port 5000');
});