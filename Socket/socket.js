const io = require("socket.io")(3002, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

let id = [];

const rooms = {};

const addUser = (userId, socketId) => {
  console.log(id, "Socket id is");
  !id.some((id) => id.userId === userId) && id.push({ userId, socketId });
  console.log(id, "users in Socket are id is");
};

const removeUser = (socketId) => {
  id = id.filter((id) => id.socketId !== socketId);
};

const getUser = (receiverId) => {
  return id.find((id) => id.userId === receiverId);
};

io.on("connection", (socket) => {
  //When Socket Connects
  console.log("A user Connected", id);

  io.emit("backend", { hello: "hello from socket" }); // FOR nodejs

  socket.on("socket", (data) => {
    console.log(data);
    const user = getUser(data.receiverId);

    io.to(user?.socketId).emit("getMessage", {
      time: data.time,
      senderId: data.senderId,
      receiverId: data.receiverId,
      messageId: data.time,
      message: data.message.message,
      referenceId: data.messageId,
      replied: data.replied,
      read: data.message.read,
      attachments: data.message.attachments,
      roomId: data.roomId,
    });
  });

  socket.on("user_join", (data) => {
    console.log(data);
    socket.join(data.groupName);
  });

  socket.on("gmessage", (data) => {
    console.log(data);
    io.to(data.roomName).emit("takeMessage", data.message);
  });
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("room-created", (data) => {
    rooms[data] = { users: [] };
    io.emit("room", data);

    rooms[data].users[socket.id] = data;
    console.log(rooms);
  });

  //send and get message

  socket.on(
    "sendmessage",
    ({
      time,
      senderId,
      receiverId,

      messageId,
      message,
      referenceId,

      replied,
      read,
      attachments,

      roomId,
    }) => {
      const user = getUser(receiverId);

      io.to(user.socketId).emit("getMessage", {
        time,
        senderId,
        receiverId,
        messageId,
        message,
        referenceId,
        replied,
        read,
        attachments,
        roomId,
      });
    }
  );

  //calling user

  socket.on("callUser", (data) => {
    console.log(data, "Fawefq");
    // io.to(userToCall).emit("calluser", (data) => {
    //   console.log(data);
    // });
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });

  //When Socket Disconnects
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    removeUser(socket.id);
    io.emit("getUsers", id);
  });
});
