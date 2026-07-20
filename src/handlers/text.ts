import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineKeyboard, registerMainMenuItem } from "../toolkit/index.js";

// Text command — user enters free-form text for the bot's main function.
// Wire into /start: register a menu item with a ForceReply prompt so the user
// taps the bot's keyboard instead of typing directly.
registerMainMenuItem({
  label: "📝 Текст",
  data: "text:prompt",
  order: 30,
});

const composer = new Composer<Ctx>();

composer.command("text", async (ctx) => {
  await ctx.reply("Введите текст:", { reply_markup: inlineKeyboard([]) });
});

composer.callbackQuery("text:prompt", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply(
    "📝 Введите текст для обработки основной функции бота. Введите /start, чтобы вернуться в меню.",
    { reply_markup: inlineKeyboard([]) },
  );
});

export default composer;
