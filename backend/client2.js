const io = require("socket.io-client");
const socket = io.connect("http://localhost:3000/B");
socket.on("create", (message) => {
    console.log(message);
});
