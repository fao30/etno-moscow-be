const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const DocumentsController = require("../../controllers/DocumentsController");
const Upload = require("../../utils/storage");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post(
	"/picture",
	Upload.picture.single("picture"),
	tryCatch(DocumentsController.createDocument)
);

router.post(
	"/file",
	Upload.file.single("file"),
	tryCatch(DocumentsController.createDocument)
);

router.get("/", tryCatch(DocumentsController.getAllDocuments));

router.get("/:id", tryCatch(DocumentsController.getDocumentById));

router.put(
	"/:id/picture",
	Upload.picture.single("picture"),
	tryCatch(DocumentsController.updateDocument)
);

router.put(
	"/:id/file",
	Upload.file.single("file"),
	tryCatch(DocumentsController.updateDocument)
);

router.delete("/:id", tryCatch(DocumentsController.deleteDocument));

router.use(errorMiddleware);

module.exports = router;
