import cron from "node-cron";

let queue = [];
process.on("message", (data) => {
  queue.push(data);
});

cron.schedule("*/1 * * * * *", () => {
  for (let queueLength = 0; queueLength < queue.length; queueLength++) {
    let data = queue[queueLength];
    console.log(data.scheduleTime);
    data.scheduleTime = data.scheduleTime - 1;
    if (data.scheduleTime <= 0) {
      console.log("Done");
      process.send(data);
      queue = queue.filter((q) => q.messageId !== data.messageId);
    }
  }
});

// import conversation from "../models/conversation.js";
// async function MessageQueue(queue) {
//   try {
//     const result = await conversation.create(queue);
//     if (result) {
//       return result;
//     }
//   } catch (error) {
//     console.log(error.message, "chat creation failed.");
//   }
// }

// let queue = [];

// setInterval(async () => {
//   for (let queueLength = 0; queueLength < queue.length; queueLength++) {
//     let data = queue[queueLength];
//     if (Date.now() - data.timestamp >= 1000 * 50) {
//       let result = await runMessageQueue(queue[queueLength]);
//       queue.splice(queueLength, 1);
//     }
//   }
// }, 1000 * 2);

// export default MessageQueue;
