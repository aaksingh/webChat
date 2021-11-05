import User from "../../models/dbUser.js";

export const details = async (req, res) => {
  const user = new User();
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
