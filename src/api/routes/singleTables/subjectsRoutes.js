const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const SubjectsController = require("../../controllers/SubjectsController");

router.use(errorMiddleware);

module.exports = router;
