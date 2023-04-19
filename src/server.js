require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");

const PORT = process.env.PORT || 3000;

const app = express();
const { sequelize } = require("./api/models");

// setup swagger
const swaggerUI = require("swagger-ui-express");
const apiDocs = require("./config/apidocs.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

// cors
const allowedOrigins = `${process.env.ALLOWED_ORIGINS}`.split(",");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(logger("dev"));

// initialize passport
require("./api/middlewares/passportJWT");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
console.log(
  process.env.TELEGRAM_BOT_TOKEN,
  "<<<====process.env.TELEGRAM_BOT_TOKEN"
);
// const bot = new TelegramBot("6046754958:AAHWTKQ_Tu0PWYQgiCXwnRasmSjZKjgWBeM", {
//   polling: true,
// });
// const bot = new Telegraf("6046754958:AAHWTKQ_Tu0PWYQgiCXwnRasmSjZKjgWBeM");
const bot = new TelegramBot("6046754958:AAHWTKQ_Tu0PWYQgiCXwnRasmSjZKjgWBeM", {
  polling: true,
});

// Define the question and answer options
const question = "What is the capital of France?";
const answerOptions = ["Paris", "Berlin", "Madrid", "London"];

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  // Send the question and answer options
  bot.sendMessage(chatId, question, {
    reply_markup: {
      keyboard: [answerOptions],
      one_time_keyboard: true,
      resize_keyboard: true,
    },
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  // Check if the user's response is correct
  if (msg.text === "Paris") {
    bot.sendMessage(chatId, "Correct answer!");
  } else {
    bot.sendMessage(chatId, "Sorry, that is incorrect.");
  }
});

// // registerLogin Routes
// app.use("/api/register", require("./api/routes/registerLogin/registerRoutes"));
// app.use("/api", require("./api/routes/registerLogin/loginRoutes"));

// // singleTables Routes
// app.use("/api/cities", require("./api/routes/singleTables/citiesRoutes"));
// app.use(
//   "/api/departments",
//   require("./api/routes/singleTables/departmentsRoutes")
// );
// app.use("/api/documents", require("./api/routes/singleTables/documentsRoutes"));
// app.use(
//   "/api/educations",
//   require("./api/routes/singleTables/educationsRoutes")
// );
// app.use(
//   "/api/institutes",
//   require("./api/routes/singleTables/institutesRoutes")
// );
// app.use("/api/majors", require("./api/routes/singleTables/majorsRoutes"));
// app.use(
//   "/api/personal-qualities",
//   require("./api/routes/singleTables/personalQualitiesRoutes")
// );
// app.use("/api/regions", require("./api/routes/singleTables/regionsRoutes"));
// app.use("/api/roles", require("./api/routes/singleTables/rolesRoutes"));
// app.use("/api/skills", require("./api/routes/singleTables/skillsRoutes"));
// app.use(
//   "/api/specializations",
//   require("./api/routes/singleTables/specializationsRoutes")
// );
// app.use("/api/studies", require("./api/routes/singleTables/studiesRoutes"));
// app.use(
//   "/api/universities",
//   require("./api/routes/singleTables/universitiesRoutes")
// );
// app.use(
//   "/api/specialties",
//   require("./api/routes/singleTables/specialitiesRoutes")
// );
// app.use("/api/users", require("./api/routes/singleTables/usersRoutes"));
// app.use("/api/subjects", require("./api/routes/singleTables/subjectsRoutes"));

// // relationsTables Routes
// app.use(
//   "/api/locations",
//   require("./api/routes/relationsTables/locationsRoutes")
// );
// app.use(
//   "/api/specializations-skills",
//   require("./api/routes/relationsTables/specializationsSkill")
// );
// app.use(
//   "/api/studies-documents",
//   require("./api/routes/relationsTables/studiesDocumentsRoutes")
// );
// app.use(
//   "/api/users-documents",
//   require("./api/routes/relationsTables/userDocumentsRoutes")
// );
// app.use(
//   "/api/users-personal-qualities",
//   require("./api/routes/relationsTables/userPersonalQualitiesRoutes")
// );
// app.use(
//   "/api/users-skills",
//   require("./api/routes/relationsTables/usersSkillsRoutes")
// );

// // hh.ru
// app.use("/api/suggestions", require("./api/routes/third-api/suggestionRoutes"));
// app.use("/api/vacancies", require("./api/routes/third-api/vacanciesRoutes"));

// //counting MOP
// app.use("/api/mop", require("./api/routes/third-api/mopRoutes"));

// // partnership
// app.use("/api/partnership", require("./api/routes/partnershipRoutes"));

// // admin
// app.use("/api/admin", require("./api/routes/adminRoutes"));

// // dashboard
// app.use("/api/public-specialization", require("./api/routes/dashboardRoutes"));

// // public
// app.use("/api/public-vacancies", require("./api/routes/publicRoutes"));

// // forget password
// app.use("/api/password", require("./api/routes/passwordRoutes"));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await sequelize.authenticate();
  console.log(`DB connected successfully`);
});
