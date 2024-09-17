import * as dotenv from "dotenv";
import { Bot } from "grammy";
import { createCommandMenu } from "./command";
dotenv.config();

// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN || ""); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
createCommandMenu(bot);
// Handle the /start command.
const URL = "https://api.openai.com/v1/chat/completions";
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("clearcontext", (ctx) => ctx.reply("Welcome! Up and running."));

// Handle other messages.
bot.on("message", async (ctx) => {
  const message = ctx.update.message.text;
  if (
    message === "start" ||
    message === "start" ||
    message === "clearcontext"
  ) {
    return;
  }
  console.log("C : ", ctx.update.message.text);
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: ctx.update.message.text || "" }],
    }),
  });
  const result = await response.json();
  console.log(result, ":::", result.choices[0].message);
  ctx.reply(result.choices[0].message.content);
});

bot.start();
