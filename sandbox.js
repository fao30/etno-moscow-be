const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

// create a new Express app
const app = express();

// set up the Telegram bot
const token = "YOUR-BOT-TOKEN";
const bot = new TelegramBot(token, { polling: true });

// parse incoming messages as JSON
app.use(bodyParser.json());

// define the available questions and answers
const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Madrid", "Berlin"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Jupiter", "Earth", "Venus", "Mars"],
    correctAnswer: "Jupiter",
  },
  {
    question: 'Who wrote the novel "Pride and Prejudice"?',
    options: [
      "Jane Austen",
      "Emily Bronte",
      "Virginia Woolf",
      "Charlotte Bronte",
    ],
    correctAnswer: "Jane Austen",
  },
];

// handle incoming messages from the Telegram bot
bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // pick a random question
  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  // format the question and options as a message
  const questionMessage = `${
    randomQuestion.question
  }\n\n${randomQuestion.options.join("\n")}`;

  // send the message with the question and options as buttons
  bot.sendMessage(chatId, questionMessage, {
    reply_markup: {
      inline_keyboard: [
        randomQuestion.options.map((option) => {
          return { text: option, callback_data: option };
        }),
      ],
    },
  });
});

// handle incoming callback queries from the Telegram bot
bot.on("callback_query", (query) => {
  const chatId = query.message.chat.id;

  // check if the answer is correct
  const question = questions.find(
    (q) => q.question === query.message.text.split("\n")[0]
  );
  const isCorrect = query.data === question.correctAnswer;
  const message = isCorrect ? "Correct answer!" : "Incorrect answer!";

  // send the message
  bot.sendMessage(chatId, message);
});

// start the Express app
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// {
//     isPrivate: false,
//     isAnswering: true,
//     questions: [
//       {
//         id: '9a8caa0c-56b2-40da-ad9c-3ab888adb434',
//         questionType: 'customResponse',
//         question: 'Siapa Nama Bapakmu?',
//         correctAnswer: 'Okta',
//         hasAnswered: false
//         score: 1
//         options: [Array],
//       }
//     ]
//   }

// const register = {
//   isRegistering: true,
//   fields: {
//     firstName: "",
//     lastName: "",
//     secondName: "",
//     university: "",
//     email: "",
//     phone: "",
//     phone: "",
//     regionId: "",
//     // telegramId: chatId,
//     // isAdmin: false,
//     // regionId: false,
//   },
// };
