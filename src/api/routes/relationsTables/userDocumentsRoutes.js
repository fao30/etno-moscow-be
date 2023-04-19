const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const errorMiddleware = require("../../middlewares/errorMiddleware");
const UsersDocuments = require("../../controllers/UsersDocumentsController");

router.post("/", tryCatch(UsersDocuments.createUserDocument));

router.get("/", tryCatch(UsersDocuments.getAllUsersDocuments));

router.get("/:id", tryCatch(UsersDocuments.getUserDocById));

router.put("/:id", tryCatch(UsersDocuments.updateUserDocument));

router.delete("/:id", tryCatch(UsersDocuments.deleteUserDoc));

router.use(errorMiddleware);

module.exports = router;
