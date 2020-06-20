const express = require("express");
const socket = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
const server = app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

app.use(express.static("public"));

const io = socket(server);

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', name =>{
        console.log("Connection made successful");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', {message: message, name: users[socket.id]})
        delete users[socket.id];
    });
})
