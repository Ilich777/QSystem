"use strict";
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000/A");
socket.on("create", (message) => {
    console.log(message);
});
//socket.emit("connection");
