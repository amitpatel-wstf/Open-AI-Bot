"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const command_1 = require("./command");
const config_1 = require("./config");
const logger_1 = require("./logger");
const getResponse_1 = require("./API/getResponse");
const bucketServices_1 = __importDefault(require("./storage/bucketServices"));
const bucketServices_2 = __importDefault(require("./storage/bucketServices"));
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new grammy_1.Bot(config_1.config.BOT_TOKEN); // <-- put your bot token between the ""
// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.
(0, command_1.createCommandMenu)(bot);
// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.command("clearcontext", (ctx) => {
    bucketServices_2.default.clearBucket(ctx);
    ctx.reply("Context cleared..!");
});
// Handle other messages.
bot.on("message", (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const message = ctx.update.message.text;
    if (message === "start" ||
        message === "clearcontext") {
        return;
    }
    const messages = bucketServices_1.default.updateBucket(ctx);
    const reponse = yield (0, getResponse_1.getResponse)(messages);
    ctx.reply(reponse);
}));
bot.start().then(() => {
    logger_1.logger.info("Bot Server");
});
