const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const InstitutesController = require("../../controllers/InstitutesController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(InstitutesController.createInstitute));

router.get("/", tryCatch(InstitutesController.getAllInstitutes));

router.get("/:id", tryCatch(InstitutesController.getInstituteById));

router.put("/:id", tryCatch(InstitutesController.updateInstitute));

router.delete("/:id", tryCatch(InstitutesController.deleteInstitute));

router.use(errorMiddleware);

module.exports = router;
