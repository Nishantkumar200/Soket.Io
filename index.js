import { Server } from "socket.io";
import express from "express";
import path from "path";

//Setting the app

const app = express();
const __dirname = path.resolve();
var server = app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

// Running the Browser
app.use("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
  //  console.log(__dirname +'/public/index.html');
});

//Setting up the socket io on the server side

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("user is connected");

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
