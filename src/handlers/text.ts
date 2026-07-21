import { Composer } from "grammy";
import type { Ctx } from "../bot.js";

const composer = new Composer<Ctx>();

// /text — command for free-form user input (non-technical users tap; they never
// type /text, but it's the exit ramp if they do). A real bot would capture
// input, process it, and return to the main menu. For this barebones scaffold
// just acknowledge receipt.
composer.command("text", async (ctx) => {
  await ctx.reply("Отправьте текст или выберите функцию из меню.");
});

export default composer;
