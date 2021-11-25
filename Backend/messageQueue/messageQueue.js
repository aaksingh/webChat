import cron from "node-cron";
process.on("message", (msg) => {
  console.log("Message from parent:", msg);
});

let counter = 0;

cron.schedule("*/10 * * * * *", () => {
  counter++;
  // if (counter % 10 === 0) {
  for (let i = 0; i < 1000; i++) {
    if (i === 999) process.send({ counter: counter });
  }
  // }
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
