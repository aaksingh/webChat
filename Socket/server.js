const io = require("socket.io")(3002);

var id = [];

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    id = [...id, data];
    console.log(id);

    socket.broadcast.emit("Online", id);
  });
});
