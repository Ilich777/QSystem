const io2 = require("socket.io-client");
const socket2 = io.connect("http://localhost:3000/service_2");
socket2.on("message", (message) => {
    console.log(message);
});
