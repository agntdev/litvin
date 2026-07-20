import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { inlineButton, inlineKeyboard } from "../toolkit/index.js";

// /help — plain-language explanation for non-technical users.
const composer = new Composer<Ctx>();

const HELP =
  "ℹ️ Введите /start, чтобы открыть меню, и выберите, что вы хотите, из кнопок.\n\n" +
  "Все функции этого бота доступны через нажатие кнопок — не нужно запоминать команды.";

composer.command("help", async (ctx) => {
  await ctx.reply(HELP);
});

const backToMenu = inlineKeyboard([[inlineButton("⬅️ Вернуться в меню", "menu:main")]]);

composer.callbackQuery("menu:help", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(HELP, { reply_markup: backToMenu });
});

export default composer;
