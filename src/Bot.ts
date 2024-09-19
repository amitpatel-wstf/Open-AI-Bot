import { Bot } from "grammy";
import { config } from "./config";
import { createCommandMenu } from "./command";

export default class BotServices {
  static instance: BotServices | null = null;
  private constructor() {}
  static getInstance() {
    if (!BotServices.instance) {
        BotServices.instance = new Bot(config.BOT_TOKEN);
    }
    return BotServices.instance;
  }
  static createAndStartServer = () => {
    const bot = BotServices.getInstance();
    // TODO: Implement server setup
    createCommandMenu(bot);
    return bot;
  };
}
