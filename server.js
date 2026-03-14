const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

const allowedUsers = ["aryan@gmail.com", "rahul@gmail.com"];

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("join", (username) => {
    if (!allowedUsers.includes(username)) {
      socket.emit("blocked", "You are not allowed!");
      socket.disconnect();
    }
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on", PORT));