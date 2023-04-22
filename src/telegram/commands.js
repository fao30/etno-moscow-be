const { Surveys, Questions } = require("../api/models");

async function sendMessageListSurveys(chatId) {
  const bot = require("../server");
  const surveys = await Surveys.findAll({
    where: {
      isPrivate: false, //FIND ONLY THE PUBLIC-DONE
      // isPrivate: false, //AND FIND THE ONE OPEN || NOT OPEN BUT REGION SAME
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  //KALAU NEMU LANGSUNG TAWARIN MAU APROS YANG MANA
  const inlineKeyboard = surveys.map((e) => [
    { text: e.title, callback_data: e.id },
  ]);
  inlineKeyboard.unshift([
    { text: "ввести номер ID опроса", callback_data: "INPUT" },
  ]);

  // Define your options for the inline keyboard
  const options = {
    reply_markup: {
      inline_keyboard: inlineKeyboard,
    },
  };

  // Send a message with the inline keyboard to the specified chat
  bot.sendMessage(chatId, "Please select an option:", options);
}

async function getQuestions(uuid) {
  const surveys = await Surveys.findOne({
    where: {
      id: uuid,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: Questions,
      },
    ],
  });

  const surveysQuest = surveys?.Questions?.map((e) => {
    return {
      id: e.id,
      questionType: e.questionType,
      question: e.questions,
      correctAnswer: e.correctAnswer,
      options: e.answersArray,
      score: e.score,
      hasAnswered: false,
    };
  });

  return surveysQuest;
}

module.exports = {
  sendMessageListSurveys,
  getQuestions,
};
