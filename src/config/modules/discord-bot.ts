export type DiscordBotConfigType = {
  token: string;
};

const discordBot = (): DiscordBotConfigType => ({
  token: process.env.BOT_TOKEN === undefined ? '' : process.env.BOT_TOKEN
});

export default discordBot;
