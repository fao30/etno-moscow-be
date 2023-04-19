const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const RegionsController = require("../../controllers/RegionsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(RegionsController.createRegion));

router.get("/", tryCatch(RegionsController.getAllRegions));

router.get("/:id", tryCatch(RegionsController.getRegionById));

router.put("/:id", tryCatch(RegionsController.updateRegion));

router.delete("/:id", tryCatch(RegionsController.deleteRegion));

router.use(errorMiddleware);

module.exports = router;
