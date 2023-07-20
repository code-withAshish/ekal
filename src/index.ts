import { createNodeMiddleware, Webhooks } from "@octokit/webhooks";
import { Bot } from "grammy";
import { createServer } from "http";

const webhooks = new Webhooks({
  secret: process.env.WEBHOOK_SECRET!
});

const bot = new Bot(process.env.BOT_TOKEN!);
const chatId = 959839873;

webhooks.onAny(async ({ id, payload, name }) => {
  console.log(name, "event received");
  await bot.api.sendMessage(chatId, `${name} event received`);
});

createServer(createNodeMiddleware(webhooks)).listen(3000);
