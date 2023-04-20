const bot = require("../server");
const {
  sendMessageListSurveys,
  getQuestions,
} = require("./commandHandlers/commands");

const userList = {};

const userRegister = {};

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const users = await Users.findOne({
    where: {
      telegramId: chatId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "regionId"],
    },
  });

  if (users) {
    //IF USER EXIST THEN SHOW LIST OF SURVEY
    sendMessageListSurveys(chatId);
    return;
  } else {
    userRegister[chatId] = {
      isRegistering: true,
      fields: {
        firstName: "",
        lastName: "",
        secondName: "",
        university: "",
        email: "",
        phone: "",
        phone: "",
        regionId: "",
      },
    };
    //KALAU GA NEMU SURUH DAFTAR
    const objectFields = userRegister[chatId].fields;
    for (const property in objectFields) {
      if (!objectFields[property]) {
        bot.sendMessage(chatId, `Введите ${property}:`);
        return;
      }
    }
    return;
  }

  // Send the question and answer options
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  //IF STILL REGISTERING HERE
  if (userRegister[chatId]?.isRegistering) {
    const objectFields = userRegister[chatId].fields;
    let filled = false;
    for (const property in objectFields) {
      if (!objectFields[property] && !filled) {
        //STORING RESULT
        objectFields[property] = text;
        filled = true;
      }
    }

    for (const property in objectFields) {
      //SENDING QUESTION TO FIELD
      if (!objectFields[property]) {
        if (property === "regionId") {
          const regions = await Regions.findAll({
            attributes: {
              exclude: ["createdAt", "updatedAt", "regionId"],
            },
          });
          //KALAU NEMU LANGSUNG TAWARIN MAU APROS YANG MANA
          const inlineKeyboard = regions.map((e) => [
            { text: e.name, callback_data: e.id },
          ]);

          // Define your options for the inline keyboard
          const options = {
            reply_markup: {
              inline_keyboard: inlineKeyboard,
            },
          };

          // Send a message with the inline keyboard to the specified chat
          bot.sendMessage(chatId, "Выберите ващ регион:", options);
        } else {
          bot.sendMessage(chatId, `Введите ${property}`);
        }
        return;
      }
    }
  }

  //IF THE ANSER да or нет and isAnswering=false
  if (!userList[chatId]?.isAnswering && (text === "да" || text === "нет")) {
    if (text === "да") {
      const image = await Jimp.create(400, 400, "#ffffff");
      console.log(msg, "<<<<===MSG");

      // Write some text on the image
      const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
      image.print(font, 50, 50, "Congratulation! you passed the test");
      image.print(
        font,
        50,
        70,
        `To ${msg.chat.first_name} ${msg.chat.last_name}`
      );
      image.print(font, 100, 200, `Your Score is:`);
      image.print(font, 150, 220, `${userList[chatId].score}`);

      // Save the image to a buffer
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

      // Send the image to the user
      bot.sendPhoto(chatId, buffer);
    } else {
      sendMessageListSurveys(chatId);
    }
    delete userList[chatId];
    return;
  }

  const user = await Users.findOne({
    where: {
      telegramId: chatId,
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "regionId"],
    },
  });

  /**
   * IF USER  IS_PRIVATE TRUE, THEN NEED TO FIND SURVEY BY ID
   */

  //IF USER IS SEARCHING SURVEYS BY ID AND HAS NOT ANSERING YET

  //3426f22e-d1e7-4dc1-a48b-38d1b94dea27
  if (userList[chatId]?.isPrivate && !userList[chatId]?.isAnswering) {
    userList[chatId] = {
      isPrivate: true,
      isAnswering: true,
      score: 0,
      questions: await getQuestions(text), //text is uuid
    };

    const questionSend = userList[chatId]?.questions[0]?.question;
    const answerSend = userList[chatId]?.questions[0]?.options;

    bot.sendMessage(chatId, questionSend, {
      reply_markup: {
        keyboard: [answerSend],
        one_time_keyboard: true,
        resize_keyboard: true,
      },
    });
    return;
  }

  if (user && userList[chatId]?.isAnswering) {
    //FIND ON WHICH QUESTIONS ARE WE IN
    let indexAnswer = NaN;
    userList[chatId]?.questions.some((element, index) => {
      if (!element.hasAnswered) {
        indexAnswer = index;
        return true;
      }
    });
    if (indexAnswer === NaN) {
      //FINISH THE SURVEY
      sendMessageListSurveys(chatId);
      return;
    }

    //CHECK IF THE ANSWER IS CORRECT
    //ADD UP THE SCORE
    if (text === userList[chatId]?.questions[indexAnswer].correctAnswer) {
      //ADD THE SCORE
      userList[chatId].score += userList[chatId]?.questions[indexAnswer].score;
    }
    //CHANGE THE QUESTION INTO TRUE
    userList[chatId].questions[indexAnswer].hasAnswered = true;
    if (userList[chatId].questions[indexAnswer + 1]) {
      const questionSend = userList[chatId].questions[indexAnswer + 1].question;
      const answerSend = userList[chatId].questions[indexAnswer + 1].options;

      bot.sendMessage(chatId, questionSend, {
        reply_markup: {
          keyboard: [answerSend],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });
    } else {
      //OPROSS FINISH BRADER
      //DELETING FORM LIST
      // delete userList[chatId];
      userList[chatId].isAnswering = false;
      bot.sendMessage(
        chatId,
        `ваши баллы: ${userList[chatId].score} распечатать сертификат?`,
        {
          reply_markup: {
            keyboard: [["да"], ["нет"]],
            one_time_keyboard: true,
            resize_keyboard: true,
          },
        }
      );
    }
  }
});

bot.on("callback_query", async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;

  if (userRegister[chatId]?.isRegistering) {
    //IF STILL REGISTERING
    const objectFields = userRegister[chatId].fields;
    for (const property in objectFields) {
      //KALAU ADA YANG AGA ADA VALUENYA
      if (!objectFields[property] && property !== "regionId") {
        //STORING RESULT
        bot.sendMessage(chatId, `Введите ${property}`);
        return;
      }
    }

    //KALAU AMAN DAN SEMUA DAH DIISI

    objectFields["regionId"] = data;
    objectFields["telegramId"] = chatId;
    objectFields["isAdmin"] = false;
    const addNewUser = await Users.create(objectFields);
    if (addNewUser) {
      //IF SUCCESSFULY ADDED NEW USER
      userList[chatId] = {
        isPrivate: false,
        isAnswering: true,
        score: 0,
      };
      delete userRegister[chatId];
      sendMessageListSurveys(chatId);
      return;
    }
    return;
  }

  if (!userList[chatId] && userRegister[chatId]?.isRegistering) {
    bot.sendMessage(chatId, "/start");

    return;
  }

  // Send a message depending on which button was pressed
  switch (data) {
    case "INPUT":
      userList[chatId] = {
        isPrivate: true,
        isAnswering: false,
      }; //kalau masukin yang private
      bot.sendMessage(chatId, "Введите номер ID опроса:");
      break;
    default:
      //NON PRIVATE AKA PUBLIC
      userList[chatId] = {
        isPrivate: false,
        isAnswering: true,
        score: 0,
        questions: await getQuestions(data),
      };

      const questionSend = userList[chatId].questions[0]?.question;
      const answerSend = userList[chatId].questions[0]?.options;

      bot.sendMessage(chatId, questionSend, {
        reply_markup: {
          keyboard: [answerSend],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
      });

      break;
  }
});
