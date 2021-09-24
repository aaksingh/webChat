// npm install morgan
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
// import auth from "./middleware/auth.js";
import user from "./routes/user.js";
import Conversation from "./models/conversation.js";
import Rep from "./models/reply.js";
import AddFriend from "./models/addfriend.js";

const port = process.env.PORT || 3001;
const app = express();

// const io = require("socket.io")

//Middlewares
app.use(express.json());
app.use(cors());

//DB configuration
const config_url =
  "mongodb+srv://aakash:ATgYUPlifmn7p4qx@cluster0.gzv6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(config_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// API routes

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// signup route
app.post("/signUp", user);

// login route
app.post("/login", user);

// user info
app.get("/userDetails", user);

// get Messages
app.get("/chatList/:conversationId", async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const data = await Conversation.find({ conversationId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
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

//Post Messages
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

//users signed up on chatapp
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

// these two endpoints are for later
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
