const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors middleware

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
      methods: ["GET", "POST"]
    }
  });

// Use cors middleware to allow requests from any origin
app.use(cors());


// Use cors middleware to allow requests from any origin
app.use(cors());

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    // Process the message, e.g., send a reply back
    const reply = `Received message from User ${data.userId}: ${data.message}`;
    console.log(data.message);
    io.to(socket.id).emit("reply", { reply });
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Socket.io server is listening on port ${PORT}`);
});