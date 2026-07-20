# Литвин — Bot specification

**Archetype:** custom

**Voice:** дружелюбный и краткий — write every user-facing message, button label, error, and empty state in this voice.

Литвин — Telegram-бот с дружелюбным интерфейсом для выполнения неуточненной основной функции. Бот приветствует пользователей, предлагает краткие подсказки и поддерживает команды /help, /settings, /about. Пользователь может взаимодействовать с ботом через текстовые команды и inline-кнопки.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- Нетерпеливые пользователи Telegram
- Пользователи 18–55 лет, знакомые с базовыми бот-командами

## Success criteria

- Пользователь может начать взаимодействие с ботом через /start
- Пользователь может получить помощь через /help
- Пользователь может настроить параметры через /settings
- Бот отвечает на текстовые команды и inline-кнопки

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Запуск бота и открытие главного меню
- **/help** (command, actor: user, command: /help) — Показать справку и доступные команды
- **/settings** (command, actor: user, command: /settings) — Открыть настройки пользователя
- **/about** (command, actor: user, command: /about) — Показать информацию о боте
- **Свободный текст** (command, actor: user, command: /text) — Отправить свободный текст для основной функции бота

## Flows

### Старт
_Trigger:_ /start

1. Приветствие пользователя
2. Показ кратких подсказок

_Data touched:_ user

### Помощь
_Trigger:_ /help

1. Показ доступных команд
2. Описание основных функций

### Настройки
_Trigger:_ /settings

1. Открытие меню настроек
2. Выбор параметров (язык, уведомления)

_Data touched:_ user_settings

### Основная функция
_Trigger:_ text

1. Обработка свободного текста
2. Выполнение основной функции

_Data touched:_ record

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **user** _(retention: persistent)_ — Telegram-профиль, который общается с ботом
  - fields: id, language, notification_settings
- **user_settings** _(retention: persistent)_ — Предпочтения пользователя
  - fields: language, notification_settings
- **record** _(retention: persistent)_ — Результат основной функции бота
  - fields: content, timestamp
- **interaction_history** _(retention: persistent)_ — История последних N взаимодействий
  - fields: user_id, message, timestamp

## Integrations

- **Telegram** (required) — Bot API messaging
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Настройка админ-уведомлений
- Выбор основной функции бота
- Настройка хранения данных

## Notifications

- Уведомления и оповещения приходят пользователю в Telegram
- Администраторские уведомления отправляются в приватный Telegram-чат администратора

## Permissions & privacy

- Сохранение минимального набора данных: ID пользователя, язык, настройки уведомлений, последние 50 сообщений
- Не собираются лишние персональные данные без явного запроса

## Edge cases

- Обработка ошибок с вежливым сообщением и подсказкой
- Отсутствие платных функций по умолчанию

## Required tests

- Проверка запуска бота через /start
- Проверка команды /help
- Проверка команды /settings
- Проверка обработки свободного текста

## Assumptions

- Бот будет работать только в Telegram
- Админ-уведомления по умолчанию отправляются в приватный Telegram-чат администратора
- Сохраняются только минимальные данные
- Нет платных функций по умолчанию
- Стиль общения — дружелюбный, краткий, русскоязычный
