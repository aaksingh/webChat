import conversation from "../../models/conversation.js";

export const chatList = async (req, res) => {
  const roomId = req.params.id;

  try {
    //   client.get(senderId, async (err, chatS) => {
    //     if (chatS) {
    //       res.status(200).send(JSON.parse(chatS));
    //     } else {
    const data = await conversation.find({ roomId });
    console.log(data);
    // client.setex(senderId, 600, JSON.stringify(data));

    res.status(200).json(data);
    //   }
    // });
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
};
