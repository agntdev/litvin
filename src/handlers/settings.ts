import { Composer } from "grammy";
import type { Ctx } from "../bot.js";
import {
  inlineButton,
  inlineKeyboard,
  registerMainMenuItem,
} from "../toolkit/index.js";

// /settings — user preferences.
//
// Registration (main menu):
//  • label — shows on /start; keep short (≤1 emoji).
//  • data — callbackQuery handler id; use prefix:feature-name.
//  • order — controls sort order; pick a decimal between existing entries.
registerMainMenuItem({
  label: "⚙️ Settings",
  data: "settings:show",
  order: 10,
});

const composer = new Composer<Ctx>();

const settingsMenu = inlineKeyboard([
  [
    inlineButton("🇺🇦 Language", "settings:lang"),
    inlineButton("🔔 Notifications", "settings:notifications"),
  ],
  [inlineButton("⬅️ Back to menu", "menu:main")],
]);

composer.command("settings", async (ctx) => {
  await ctx.reply("⚙️ Choose a setting:", { reply_markup: settingsMenu });
});

composer.callbackQuery("settings:show", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.editMessageText("⚙️ Choose a setting:", { reply_markup: settingsMenu });
});

composer.callbackQuery("settings:lang", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Language selected: English");
});

composer.callbackQuery("settings:notifications", async (ctx) => {
  await ctx.answerCallbackQuery();
  await ctx.reply("Notifications enabled");
});

export default composer;
