const io = require("socket.io")(3002, {
  cors: {
    origin: "http://localhost:3000",
  },
});

var id = [];

io.on("connection", (socket) => {
  socket.on("uniqueId", (data) => {
    if (!id.includes(data)) {
      id = [...id, data];
    }
    socket.broadcast.emit("Online", id);
  });

  socket?.on("dct", (data) => {
    id = id.filter((id) => data !== id);

    socket.disconnect();
    socket.broadcast.emit("Online", id);
    console.log(id);
  });

  socket.on("private message", ({ content, to, from }) => {
    console.log(to, from);
    socket.to(to).emit("privatemessage", {
      content,
      from,
    });
  });
});
