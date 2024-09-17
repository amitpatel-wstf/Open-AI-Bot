import * as dotenv from 'dotenv';
import OpenAI from "openai";
import { Bot } from "grammy";
dotenv.config();

const openai = new OpenAI();
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN ||  ""); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.
bot.on("message",async (ctx) => {
    console.log("C : ",ctx.update.message.text);
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {"role": "user", "content": ctx.update.message.text || ""}
        ]
    });
    
    ctx.reply("Welcome! Up and running")
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
