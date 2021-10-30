const io = require("socket.io")(3002, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let id = [];

const rooms = {};

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

    io.emit("getUsers", id);
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
      read,

      attachments,
    }) => {
      const user = getUser(receiverId);

      io.to(user.socketId).emit("getMessage", {
        time,
        senderId,
        receiverId,
        messageId,
        message,
        referenceId,
        read,
        attachments,
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
