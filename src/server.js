require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require("cors");
const TelegramBot = require("node-telegram-bot-api");
const { Questions, Users, Surveys, Regions } = require("./api/models");
const Jimp = require("jimp");

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

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
  polling: true,
});

//USER ROUTE
app.use("/api/users", require("./api/routes/usersRoutes"));

//QUESTIONS ROUTE
app.use("/api/questions", require("./api/routes/questionsRoutes"));

//SURVEYS ROUTE
app.use("/api/surveys", require("./api/routes/surveysRoutes"));

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await sequelize.authenticate();
  console.log(`DB connected successfully`);
});

module.exports = bot;
