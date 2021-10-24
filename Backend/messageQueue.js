import conversation from "./models/conversation.js";

async function runMessageQueue(queue) {
  try {
    const result = await conversation.create(queue);
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error.message, "chat creation failed.");
  }
}
export default runMessageQueue;
