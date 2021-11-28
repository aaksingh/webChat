import cron from "node-cron";

let messageQueue = [];
process.on("message", (msg) => {
  console.log("Message from parent:", msg);
});

let counter = 0;

cron.schedule("*/1 * * * * *", () => {
  counter++;
  let messageData = {
    time: 1638027883006,
    senderId: "60f492297c726f3854f1f55a",
    receiverId: "60f4921e7c726f3854f1f556",
    messageId: 1638027883006,
    referenceId: null,
    replied: null,
    roomId: "6176411d6fa39a3768824005",
    message: {
      message: "Check the scheduled message",
      read: false,
      attachments: null,
    },
  };

  if (counter === 10) process.send({ messageData: messageData });

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
