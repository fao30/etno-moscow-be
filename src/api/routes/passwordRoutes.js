const router = require("express").Router();
const { tryCatch } = require("../utils/tryCatch");
const errorMiddleware = require("../middlewares/errorMiddleware");
const PasswordController = require("../controllers/PasswordController");

router.post("/", tryCatch(PasswordController.generateToken));

router.put("/:token", tryCatch(PasswordController.verifyToken));

router.use(errorMiddleware);

module.exports = router;
