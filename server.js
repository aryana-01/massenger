// api/server.js
const { Server } = require("socket.io");

module.exports = (req, res) => {
    if (!res.socket.server.io) {
        console.log("Initializing Socket.io...");
        const io = new Server(res.socket.server, {
            path: "/api/socketio",
        });

        const allowedUsers = ["aryan@gmail.com", "rahul@gmail.com"];

        io.on("connection", socket => {
            console.log("User connected");

            socket.on("join", username => {
                if (!allowedUsers.includes(username)) {
                    socket.emit("blocked", "You are not allowed!");
                    socket.disconnect();
                }
            });

            socket.on("chat message", msg => {
                io.emit("chat message", msg);
            });
        });

        res.socket.server.io = io;
    }
    res.end();
};
