const router = require("express").Router();
const { tryCatch } = require("../../utils/tryCatch");
const DepartmentsController = require("../../controllers/DepartmentsController");
const errorMiddleware = require("../../middlewares/errorMiddleware");

router.post("/", tryCatch(DepartmentsController.createDepartment));

router.get("/", tryCatch(DepartmentsController.getAllDepartments));

router.get("/:id", tryCatch(DepartmentsController.getDepartmentById));

router.put("/:id", tryCatch(DepartmentsController.updateDepartment));

router.delete("/:id", tryCatch(DepartmentsController.deleteDepartment));

router.use(errorMiddleware);

module.exports = router;