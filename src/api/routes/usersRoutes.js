const router = require("express").Router();
const UsersController = require("../controllers/UsersController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

//get all user
router.get("/", tryCatch(UsersController.getAllUsers));

//user by id
router.get("/:id", tryCatch(UsersController.getUserById));

router.use(errorMiddleware);

module.exports = router;
