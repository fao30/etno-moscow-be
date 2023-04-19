const SkillsService = require("../service/skillService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");
const ExtractToken = require("../helpers/extractToken");
const UserSkillService = require("../service/userSkillService");

class SkillsController {
	static async createSkill(req, res) {
		const bearer = req.headers["authorization"];
		const token = bearer?.split(" ")[1];
		if (!token) {
			throw new AppError(403, "Unauthorized", 400);
		}

		const body = ExtractToken(token);
		if (!body) {
			throw new AppError(204, "Token is empty", 400);
		}
		const { name, isHardSkill, link } = req.body;

		const skill = await SkillsService.createSkill(name, isHardSkill, link);

		if (!skill) {
			throw new AppError(BAD_REQUEST, "Cannot create skill", 400);
		}

		await UserSkillService.createUserSkill({
			user_id: body.user.id,
			skill_id: skill.id,
		});

		return res.status(CREATED).json({ skill });
	}

	static async getAllSkills(req, res) {
		const skills = await SkillsService.findAllSkills();

		if (skills.length === 0) {
			throw new AppError(NO_CONTENT, "Skills not found", 400);
		}

		return res.json(skills);
	}

	static async getSkillById(req, res) {
		const { id } = req.params;
		const skill = await SkillsService.findSkillById(id);

		if (!skill) {
			throw new AppError(NOT_FOUND, "Skill not found", 400);
		}

		return res.json(skill);
	}

	static async updateSkill(req, res) {
		const { id } = req.params;
		const { name, isHardSkill, link } = req.body;

		const oldSkill = await SkillsService.findSkillById(id);

		if (!oldSkill) {
			throw new AppError(NOT_FOUND, "Skill not found to update", 400);
		}

		oldSkill.name = name;
		oldSkill.isHardSkill = isHardSkill;
		oldSkill.link = link;

		await oldSkill.save();

		return res.json({ message: "Updated" });
	}

	static async deleteSkill(req, res) {
		const { id } = req.params;

		const deleted = await UserSkillService.deleteUserSkillBySkillId(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete skill", 400);
		}

		return res.json({ message: "Skill deleted" });
	}
}

module.exports = SkillsController;
