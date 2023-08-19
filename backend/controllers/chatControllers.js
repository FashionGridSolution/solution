const http = require("http");
const express = require("express");
const socketIo = require("socket.io");
const cors = require("cors"); // Import the cors middleware
const axios=require('axios')
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
  socket.on("message", async (data) => {
    // Process the message, e.g., send a reply back
    const msg = data.message;
    const type=data.type;
    const testing = `Received message from User ${data.userId}: ${data.message}`;
    console.log(testing);
    
    //send the reqForModel to post to port 5000
    try {
      const response = await axios.post("http://127.0.0.1:5000/getans", {
        userId:data.userId,
        text: msg,
        type:type,
      });

      const capitalizedMessage = response.data.result;
      console.log("Capitalized message:", capitalizedMessage);
      
      io.to(socket.id).emit("reply", { reply: capitalizedMessage });
    } catch (error) {
      console.error("Error sending POST request:", error);
      io.to(socket.id).emit("reply", { reply: "Error occurred while processing." });
    }
  });
});

const PORT = 9000;
server.listen(PORT, () => {
  console.log(`Socket.io server is listening on port ${PORT}`);
});