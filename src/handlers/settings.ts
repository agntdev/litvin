import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import { mainMenuKeyboard, registerMainMenuItem } from "../toolkit/index.js";

// Adds a button to the /start main menu: `menu:settings`.
registerMainMenuItem({ label: "⚙️ Settings", data: "menu:settings", order: 40 });

const SETTINGS = "⚙️ Настройки пользователя";

const composer = new Composer<Ctx>();

composer.command("settings", async (ctx) => {
  await ctx.reply(SETTINGS, { reply_markup: mainMenuKeyboard() });
});

// Also reachable by the menu button — same text, same menu.
composer.callbackQuery("menu:settings", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText(SETTINGS, { reply_markup: mainMenuKeyboard() });
});

export default composer;
