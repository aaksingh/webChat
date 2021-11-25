//import auth from "./middleware/auth.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import userDetails from "./routes/userDetails/userDetails.js";
import list from "./routes/friendsList/friendsList.js";

import groups from "./routes/groups/groups.js";
import Conversation from "./models/conversation.js";
import Rep from "./models/reply.js";
import AddFriend from "./models/addfriend.js";

import path from "path";
import redis from "redis";

import child_process from "child_process";

const __dirname = path.resolve();
console.log(__dirname);
const port = process.env.PORT || 3001;
const app = express();
const redisClient = redis.createClient(6379);

app.use(express.json({ limit: "50mb" })); //For JSON requests
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));
var queue = [];
{
  /*Child process here*/
}
// const parentPro = child_process.fork("./messageQueue/messageQueue.js");
// parentPro.on("message", (msg) => {
//   console.log("Message from child", msg);
// });

// parentPro.send({ hello: "world" });
{
  /*child process ends here*/
}
//DB configuration
const config_url =
  "mongodb+srv://aakash:ATgYUPlifmn7p4qx@cluster0.gzv6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

var client = mongoose
  .connect(config_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => console.log(`Listening on Port:${port}`));
  })
  .catch((e) => {
    console.log(e);
  });

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});
app.post("/signUp", user);

app.post("/login", user);

app.get("/userDetails", userDetails);

app.get("/friendsList", list);

// get Messages
app.get("/chatList/:id", async (req, res) => {
  const roomId = req.params.id;

  try {
    redisClient.get(roomId, async (err, chatS) => {
      if (chatS) {
        res.status(200).send(JSON.parse(chatS));
      } else {
        const data = await Conversation.find({ roomId });

        // redisClient.set(roomId, 600, JSON.stringify(data));
        res.status(200).json(data);
      }
    });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

app.get("/replyList/:conversationId", async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const data = await Rep.find({ conversationId });
    // console.log(data);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get("/groups", groups);
app.put("/addtoroom", (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    Groups.findByIdAndUpdate(
      { _id: data.receiver },
      { $push: { room: data.sender } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          // console.log("done");
          res.status(201).send(data);
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/create", async (req, res) => {
  const data = req.body;

  queue.push(data);

  const conversation = new Conversation(data);
  try {
    await conversation.save();
    res.status(201).send(data);
  } catch (error) {
    res.status(500).send(err);
  }
});

app.post("/group", (req, res) => {
  const data = req.body;
  let e = [];
  let d = {
    ownerId: data.ownerId,
    roomName: data.roomName,
    room: e,
    ownerName: data.onwerName,
  };

  try {
    Groups.create(d, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    console.log(error.message, "chat creation failed.");
  }
});

app.post("/reply", (req, res) => {
  const data = req.body;

  try {
    Rep.create(data, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    console.log(error.message, "chat creation failed.");
  }
});

app.post("/addfriend", async (req, res) => {
  let data = {
    s1: req.body.userId,
    s2: req.body.friendId,
  };
  try {
    AddFriend.create(data, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    console.log(error.message, "chat creation failed.");
  }
});

app.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const user = await Conversation.deleteOne({ _id: id }).lean();
  } catch (error) {
    console.log(error);
  }
});

// setInterval(async () => {
//   if (queue.length) {
//     let data = queue[0];

//     console.log(Date.now() - data.time);
//   }
//   for (let queueLength = 0; queueLength < queue.length; queueLength++) {
//     let data = queue[queueLength];
//     if (Date.now() - data.time > 5 * 1000) {
//       console.log("jreee");
//       let result = await MessageQueue(queue[queueLength]);
//       queue.splice(queueLength, 1);
//     }
//   }
// }, 1000 * 2);

// let upload = multer();
// app.post("/upload", upload.single("file"), (req, res, next) => {
//   const { file } = req;

//   let extension = file.mimetype.split("image/");

//   const fileName =
//     "chat" + Math.floor(Math.random() * 1000) + "." + extension[1];

//   // if (extension[1] === "jpg" || extension[1] === "jpeg") {
//   //   pipelineAsync(
//   //     file.buffer,
//   //     fs.createWriteStream(`./public/images/${fileName}`)
//   //   )
//   //     .then(() => {
//   //       console.log("Here");
//   // let id = Date.now();
//   // let data = {
//   //   time: [],
//   //   senderId: req.body.sender,
//   //   receiverId: req.body.receiver,
//   //   messageId: id,
//   //   message: {
//   //     message: path,
//   //     referenceId: null,
//   //     read: false,
//   //     attachments: true,
//   //   },
//   // };
//   // Conversation.create(data, (err, data) => {
//   //   if (err) {
//   //     res.status(500).send(err);
//   //   } else {
//   //     console.log("donne");
//   //     res.json({ id: data.messageId, path: data.message.message });
//   //     // res.sendStatus(201).send({ data: data.messageId });
//   //   }
//   // });
//   // })
//   // .catch((err) => {
//   //   console.log("erer");
//   //   console.log(err);
//   // });
//   // }
// });
