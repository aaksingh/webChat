//import auth from "./middleware/auth.js";
import redis from "redis";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import Conversation from "./models/conversation.js";
import Rep from "./models/reply.js";
import AddFriend from "./models/addfriend.js";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import multer from "multer";
import path from "path";
import runMessageQueue from "./messageQueue.js";
import moment from "moment";
const pipelineAsync = promisify(pipeline);
const __dirname = path.resolve();
const port = process.env.PORT || 3001;
const app = express();
// const client = redis.createClient(6379);
//Middlewares
const redisPort = 6379;
const client = redis.createClient(redisPort);
client.on("error", (err) => {
  console.log(err);
});

app.use(express.json({ limit: "50mb" })); //For JSON requests
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);
app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000" }));

//DB configuration
const config_url =
  "mongodb+srv://aakash:ATgYUPlifmn7p4qx@cluster0.gzv6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(config_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let queue = [];

setInterval(async () => {
  for (let queueLength = 0; queueLength < queue.length; queueLength++) {
    let data = queue[queueLength];
    if (Date.now() - data.timestamp >= 1000 * 50) {
      let result = await runMessageQueue(queue[queueLength]);
      queue.splice(queueLength, 1);
    }
  }
}, 1000 * 2);

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});
app.post("/signUp", user);
app.post("/login", user);
app.get("/userDetails", user);

app.get("/friendsList", async (req, res) => {
  const s1 = req.query.s1;
  const s2 = req.query.s2;

  try {
    const data = await AddFriend.find({
      $or: [
        { $and: [{ s1: s1 }, { s2: s2 }] },
        { $and: [{ s1: s2 }, { s2: s1 }] },
      ],
    });

    if (data.length) {
      res.status(200).json(data);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

// get Messages
app.get("/chatList/:id", async (req, res) => {
  const roomId = req.params.id;

  try {
    //   client.get(senderId, async (err, chatS) => {
    //     if (chatS) {
    //       res.status(200).send(JSON.parse(chatS));
    //     } else {
    const data = await Conversation.find({ roomId });
    console.log(data);
    // client.setex(senderId, 600, JSON.stringify(data));

    res.status(200).json(data);
    //   }
    // });
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
app.get("/download", async (req, res) => {
  const messageId = req.query.s1;

  var p = {};
  try {
    p = await Conversation.find({ messageId });
  } catch (err) {
    console.log(err);
  }

  console.log(__dirname, p);

  res.download(__dirname + p[0]?.message.message);
});

app.post("/create", (req, res) => {
  const data = req.body;
  console.log(data);
  // queue.push(data);
  // res.status(201).send(data);

  try {
    Conversation.create(data, (err, data) => {
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
const upload = multer();
app.post("/upload", upload.single("file"), (req, res, next) => {
  const {
    file,
    body: { senderId, receiverId },
  } = req;

  const fileName =
    "chat" + Math.floor(Math.random() * 1000) + file.detectedFileExtension;

  var path = `images/${fileName}`;
  if (
    file.detectedFileExtension === ".jpg" ||
    file.detectedFileExtension === ".jpeg"
  ) {
    pipelineAsync(
      file.stream,
      fs.createWriteStream(`./public/images/${fileName}`)
    ).then(() => {
      let id = Date.now();
      let data = {
        time: [],
        senderId: req.body.sender,
        receiverId: req.body.receiver,
        messageId: id,
        message: {
          message: path,
          referenceId: null,
          read: false,
          attachments: true,
        },
      };
      Conversation.create(data, (err, data) => {
        if (err) {
          res.status(500).send(err);
        } else {
          console.log("donne");
          res.json({ id: data.messageId, path: data.message.message });
          // res.sendStatus(201).send({ data: data.messageId });
        }
      });
    });
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

app.listen(port, () => console.log(`Listening on Port:${port}`));
