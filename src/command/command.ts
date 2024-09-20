export async function createCommandMenu(bot: any) {
  await bot.api.setMyCommands([
    { command: "start", description: "Start the bot" },
    // { command: "help", description: "Show help text" },
    { command: "clearcontext", description: "Clear Context History" },
  ]);
}
