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

// get Messages
app.get("/chatList", async (req, res) => {
  const senderId = req.query.s1;
  const receiverId = req.query.s2;
  try {
    client.get(senderId, async (err, chatS) => {
      if (chatS) {
        res.status(200).send(JSON.parse(chatS));
      } else {
        const data = await Conversation.find({
          $or: [
            { $and: [{ senderId: senderId }, { receiverId: receiverId }] },
            { $and: [{ senderId: receiverId }, { receiverId: senderId }] },
          ],
        });

        client.setex(senderId, 600, JSON.stringify(data));

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

app.get("/friendslist/:id", async (req, res) => {
  try {
    const data = await AddFriend.find({
      members: {
        $in: req.params.id,
      },
    });

    res.status(200).json(data);
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/addfriend", async (req, res) => {
  const AddFriends = new AddFriend({
    members: [req.body.userId, req.body.friendId],
  });

  try {
    const savedFriend = await AddFriends.save();
    res.status(200).json(savedFriend);
  } catch (err) {
    res.status(500).json(err);
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

// if (file.detectedFileExtension === ".zip") {
//   await pipelineAsync(
//     file.stream,
//     fs.createWriteStream(`./public/zip/${fileName}`)
//   );
// } else if (file.detectedFileExtension === ".jpg" || ".jpeg") {
