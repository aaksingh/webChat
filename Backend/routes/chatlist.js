import express from "express";

const router = express.Router();

router.get("/chatList/:conversationId", async (req, res) => {
  const conversationId = req.params.conversationId;

  try {
    const data = await Conversation.find({ conversationId });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
