"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const config_1 = require("./config");
const command_1 = require("./command");
class BotServices {
    constructor() { }
    static getInstance() {
        if (!BotServices.instance) {
            BotServices.instance = new grammy_1.Bot(config_1.config.BOT_TOKEN);
        }
        return BotServices.instance;
    }
}
BotServices.instance = null;
BotServices.createAndStartServer = () => {
    const bot = BotServices.getInstance();
    // TODO: Implement server setup
    (0, command_1.createCommandMenu)(bot);
    return bot;
};
exports.default = BotServices;
