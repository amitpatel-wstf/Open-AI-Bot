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

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("clearcontext", (ctx) => {
  BucketServices.clearBucket(ctx);
  ctx.reply("Context cleared..!");
});

// Handle other messages.
bot.on("message", async (ctx) => {
  const message = ctx.update.message.text;
  if (
    message === "start" ||
    message === "clearcontext"
  ) {
    return;
  }
  const messages = Bucket.updateBucket(ctx);
  const reponse = await getResponse(messages);

  ctx.reply(reponse);
});

app.listen(config.PORT,()=>{
  console.log(`Server is running on port ${config.PORT}`);
})

bot.start().then(() => {
  
  logger.info("Bot Server");
});
