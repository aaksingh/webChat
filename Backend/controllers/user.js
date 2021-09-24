import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/dbUser.js";
import { secret } from "../secret/secret.js";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username }).lean();
  if (user === null) {
    return res.json({ status: "error", error: "Invalid" });
  }

  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ id: user.id, username: username }, secret);

    return res.json({
      status: "ok",
      user: user,
    });
  }

  return res.json({ status: "error", error: "Invalid" });
};

export const signUp = async (req, res) => {
  const userDb = req.body;

  const password = await bcrypt.hash(req.body.password, 10);
  userDb.password = password;
  try {
    User.create(userDb, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(data);
      }
    });
  } catch (error) {
    console.log(error.message, "account creation failed.");
  }
};

// export const create = (req, res) => {
//   const data = req.body;
//   console.log(data);
// };
