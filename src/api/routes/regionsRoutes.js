const router = require("express").Router();
const RegionsController = require("../controllers/RegionsController");
const errorMiddleware = require("../middlewares/errorMiddleware");
const { tryCatch } = require("../utils/tryCatch");

//get all user
router.get("/", tryCatch(RegionsController.getAllRegions));

//user by id
router.get("/:id", tryCatch(RegionsController.getRegionById));

router.use(errorMiddleware);

module.exports = router;
