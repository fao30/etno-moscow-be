const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const MajorController = require("../../controllers/MajorsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(MajorController.createMajor));

router.get("/", tryCatch(MajorController.getAllMajors));

router.get("/:id", tryCatch(MajorController.getMajorById));

router.put("/:id", tryCatch(MajorController.updateMajor));

router.delete("/:id", tryCatch(MajorController.deleteMajor));

router.use(errorMiddleware);

module.exports = router;
