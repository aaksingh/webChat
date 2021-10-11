//import auth from "./middleware/auth.js";
import redis from "redis";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import user from "./routes/user.js";
import Conversation from "./models/conversation.js";
import Rep from "./models/reply.js";
import AddFriend from "./models/addfriend.js";
import bodyParser from "body-parser";

const port = process.env.PORT || 3001;
const app = express();
// const client = redis.createClient(6379);
//Middlewares

app.use(express.json({ limit: "50mb" })); //For JSON requests
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(cors());

//DB configuration
const config_url =
  "mongodb+srv://aakash:ATgYUPlifmn7p4qx@cluster0.gzv6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(config_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  // console.log(senderId, receiverId);
  // client.get("postData", (err, redis_data) => {
  //   if (err) {
  //     throw error;
  //   }
  //   if (redis_data) {
  //     console.log(JSON.parse(redis_data));
  //     return res.status(200).send(JSON.parse(redis_data));
  //   }
  // });
  try {
    const data = await Conversation.find({
      $or: [
        { $and: [{ senderId: senderId }, { receiverId: receiverId }] },
        { $and: [{ senderId: receiverId }, { receiverId: senderId }] },
      ],
    });

    // console.log(data);
    // client.setex("postData", 3600, JSON.stringify(data));
    res.status(200).json(data);
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

app.post("/create", (req, res) => {
  const data = req.body;

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
