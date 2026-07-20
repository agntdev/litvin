import { Composer } from "grammy";

const composer = new Composer();

composer.command("about", async (ctx) => {
  await ctx.reply(
    "ℹ️ Литвин — Telegram-бот с дружелюбным интерфейсом для выполнения неуточненной основной функции.\n\n" +
      "Используйте /start, чтобы открыть меню, и выберите, что вы хотите, из кнопок.",
  );
});

export default composer;
