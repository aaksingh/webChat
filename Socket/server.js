const io = require("socket.io")(3002, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let id = [];

const addUser = (userId, socketId) => {
  !id.some((id) => id.userId === userId) && id.push({ userId, socketId });
};

const removeUser = (socketId) => {
  id = id.filter((id) => id.socketId !== socketId);
};

const getUser = (receiverId) => {
  return id.find((id) => id.userId === receiverId);
};

io.on("connection", (socket) => {
  //When Socket Connects

  console.log("A user Connected");
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", id);
  });
  //send and get message

  console.log(id);
  socket.on("sendmessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);

    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //When Socket Disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", id);
  });
});
