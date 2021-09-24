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

  socket.on(
    "sendmessage",
    ({
      time,
      senderId,
      receiverId,
      conversationId,
      message,
      referenceId,
      read,
      authorId,
      attachments,
    }) => {
      const user = getUser(receiverId);

      io.to(user.socketId).emit("getMessage", {
        time,
        senderId,
        receiverId,
        conversationId,
        message,
        referenceId,
        read,
        authorId,
        attachments,
      });
    }
  );

  //calling user

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", {
      signal: signalData,
      from: from,
      name: name,
    });
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
