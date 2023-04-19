const { OK, CREATED } = require("../constants/statusCode");
const AppError = require("../helpers/AppError");
const MopServices = require("../service/mopService");
const ExtractToken = require("../helpers/extractToken");
const StudyService = require("../service/studyService");
const UserServices = require("../service/userService");
const XLSX = require("xlsx");
const SpecializationService = require("../service/specializationService");
const DocumentsService = require("../service/documentsService");
const path = require("path");

class MopController {
	static async getStatByIdMop(req, res) {
		const { id } = req.params;

		const resp = await MopServices.getStatByIdOp(+id);

		if (!resp) {
			throw new AppError(404, "resp not found", 404);
		}

		return res.status(OK).json(resp);
	}

	static async createOp(req, res) {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(401, "Unauthorized", 400);
		}

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}

		const user = await UserServices.findUserById(body.user.id);

		if (!user) {
			throw new AppError(404, "User not found", 404);
		}

		const file = req.file.path;
		const workbook = XLSX.readFile(file);
		const worksheet = workbook.Sheets[workbook.SheetNames[0]];
		const end = worksheet["!ref"].split(":")[1].split("B")[1]; //B4
		const dataFromExcel = [];

		for (let i = 0; i < end; i++) {
			if (!worksheet[`A${i + 1}`]) {
				console.log("NO DATA");
			} else {
				dataFromExcel.push({
					name: worksheet[`A${i + 1}`].v,
					text: worksheet[`B${i + 1}`].v,
				});
			}
		}

		const uploadDataFromExcel = await StudyService.bulkCreateSubjects({
			bulkName: dataFromExcel,
		});

		const {
			name,
			universityId,
			instituteId,
			majorId,
			educationId,
			vacancyType,
		} = req.body;
		const urlArr = file.split("/");
		const path = urlArr.slice(1, urlArr.length).join("/");

		const extension = req.file.originalname.substring(
			req.file.originalname.lastIndexOf(".")
		); // .xlsx

		function addExtensionToFilename(filename, extension) {
			return filename + extension;
		}

		const newString = addExtensionToFilename(name, extension);
		const fileName = `Аннотация - ${newString}`;

		const document = await DocumentsService.createDocument({
			name: fileName,
			fileUrl: path,
		});

		const study = await StudyService.createStudy({
			name,
			instituteId,
			universityId,
			majorId,
			educationId,
			documentId: document.id,
			userId: user.id,
		});

		if (!study) {
			throw new AppError(400, "Cannot create study", 400);
		}

		const getBulkSpecializations = vacancyType.map((e) => {
			return {
				name: e.name,
				studyId: study.id,
			};
		});

		await SpecializationService.bulkCreateSpecialization({
			bulkName: getBulkSpecializations,
		});

		const getIdOfBulkUpload = uploadDataFromExcel.map((e) => {
			return {
				subjectId: e.id,
				studyId: study.id,
			};
		});

		const addBulkStudiesSubjects = await StudyService.bulkCreateStudiesSubjects(
			{
				bulkName: getIdOfBulkUpload,
			}
		);

		return res.status(CREATED).json({ addBulkStudiesSubjects });
	}

	static async getMeMOP(req, res) {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}
		let showAll = false;
		if (req.query.showAll) {
			showAll = JSON.parse(req.query.showAll); // parse string to boolean
		}

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}

		const mopData = await UserServices.findUserById(body.user.id);
		const mopGetMe = await StudyService.findAllStudiesByMopId(
			body.user.id,
			showAll
		);
		if (!mopGetMe) {
			throw new AppError(204, "MOP not found", 400);
		}

		return res.json({ data: mopData, OP: mopGetMe });
	}
}

module.exports = MopController;
