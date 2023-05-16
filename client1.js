"use strict";
const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000/service_1");
socket.on("message", (message) => {
    console.log(message);
});
socket.emit("connection");
