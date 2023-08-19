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
// const response={
//   "Body": "{'0. Gender': 'No Gender', '1. Topwear': 'Sequinned blouse or saree blouse', '2. Bottomwear': 'Saree or lehenga', '3. Footwear': 'Heels or flats', '4. Accessory': 'Jewellery', '5. Budget lower limit': 0, '6. Budget upper limit': 10000000.0}",
//   "Prods": {
//       "Accessories": [
//           565,
//           568,
//           572,
//           160
//       ],
//       "Clothing": [
//           2970,
//           2746,
//           2745,
//           1057,
//           268,
//           2746,
//           1057,
//           2745
//       ],
//       "Footwear": [
//           2215,
//           876
//        ]
//     }
// }
io.on("connection", (socket) => {
  socket.on("message", async (data) => {
    // Process the message, e.g., send a reply back
    const msg = data.message;
    const type=data.type;
    const testing = `Received message from User ${data.userId}: ${data.message}`;
    console.log(testing);
    
    try {
      console.log("+++++++++++++++++Herre++++++++++++++");
      const response = await axios.post("http://127.0.0.1:5000/getans", {
        user_id: 1,
        text: msg,
        query_type:type,
      });
      console.log("+++++++++++++++++++++++++++++++",response);
      const capitalizedMessage = response.data;
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