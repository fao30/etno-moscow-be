const router = require("express").Router();
const { tryCatch } = require("../utils/tryCatch");
const errorMiddleware = require("../middlewares/errorMiddleware");
const PartnershipController = require("../controllers/PartnershipController");

router.post("/", tryCatch(PartnershipController.partnership));

router.use(errorMiddleware);

module.exports = router;
