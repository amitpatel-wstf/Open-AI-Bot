import { Bot } from "grammy";
import { createCommandMenu } from "./command/command";
import { config } from "./config";
import { logger } from "./logger";
import { getResponse } from "./API/getResponse";
import Bucket from "./storage/bucketServices";
import BucketServices from "./storage/bucketServices";
import { app } from "./app/app";

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(config.BOT_TOKEN); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
createCommandMenu(bot);
// Handle the /start command.

bot.command("start", (ctx) =>
  ctx.reply(
    `Welcome to Chat GPT - Turbo! 🚀

I'm here to help you with anything—whether it's answering questions, brainstorming ideas, or just having a friendly chat. Ready to get started? Ask away, and I'll respond at turbo speed! ⚡

Type your question or command below and let’s chat! 😊`,
    {
      parse_mode: "HTML",
    }
  )
);
bot.command("clearcontext", (ctx) => {
  BucketServices.clearBucket(ctx);
  ctx.reply("Context cleared..!");
});

// Handle other messages.
bot.on("message", async (ctx) => {
  const message = ctx.update.message.text;
  if (message === "start" || message === "clearcontext") {
    return;
  }
  const messages = Bucket.updateBucket(ctx);
  const reponse = await getResponse(messages);

  ctx.reply(reponse);
});

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});

bot.start().then(() => {
  logger.info("Bot Server");
});
