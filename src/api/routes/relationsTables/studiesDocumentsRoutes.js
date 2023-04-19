const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const StudiesDocumentsController = require("../../controllers/StudiesDocumentsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.get("/", tryCatch(StudiesDocumentsController.findStudyDocs));

router.get("/:id", tryCatch(StudiesDocumentsController.findStudyDocById));

router.delete("/:id", tryCatch(StudiesDocumentsController.deleteStudyDoc));

router.use(errorMiddleware);

module.exports = router;
