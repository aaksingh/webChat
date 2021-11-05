import addfriend from "../../models/addfriend.js";

export const friendsLists = async (req, res) => {
  const s1 = req.query.s1;
  const s2 = req.query.s2;
  console.log("fewf");
  try {
    const data = await addfriend.find({
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
};
