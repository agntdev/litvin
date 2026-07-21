import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { mainMenuKeyboard, registerMainMenuItem } from "../toolkit/index.js";

// Adds a button to the /start main menu: `menu:about`.
registerMainMenuItem({ label: "ℹ️ About", data: "menu:about", order: 30 });

const ABOUT =
  "ℹ️ Литвин — дружелюбный Telegram-бот с простым интерфейсом.\n\n" +
  "Нажимайте кнопки, чтобы управлять ботом — не нужно запоминать команды.";

const composer = new Composer<Ctx>();

composer.command("about", async (ctx) => {
  await ctx.reply(ABOUT, { reply_markup: mainMenuKeyboard() });
});

// Also reachable by the menu button — same text, same menu.
composer.callbackQuery("menu:about", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(ABOUT, { reply_markup: mainMenuKeyboard() });
});

export default composer;
