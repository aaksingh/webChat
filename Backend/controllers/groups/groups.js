import Groups from "../../models/groups.js";

export const groups = async (req, res) => {
  try {
    let p = await Groups.find({});
    res.status(200).json(p);
  } catch (err) {
    console.log(err);
  }
};
