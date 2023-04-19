const UsersSkillsService = require("../service/userSkillService");
const AppError = require("../helpers/AppError");
const {
	NO_CONTENT,
	NOT_FOUND,
	BAD_REQUEST,
	CREATED,
} = require("../constants/statusCode");

class UsersSkillsController {
	static async createUserSkill(req, res) {
		const { userId, skillId } = req.body;

		const userSkill = await UsersSkillsService.createUserSkill(userId, skillId);

		if (!userSkill) {
			throw new AppError(BAD_REQUEST, "Cannot create user skill");
		}

		return res.status(CREATED).json(userSkill);
	}

	static async getAllUsersSkills(req, res) {
		const usersSkills = await UsersSkillsService.findAllUsersSkill();

		if (usersSkills.length === 0) {
			throw new AppError(NO_CONTENT, "Users skills not found", 400);
		}

		return res.json(usersSkills);
	}

	static async getUserSkillById(req, res) {
		const { id } = req.params;

		const userSkill = await UsersSkillsService.findUserSkillById(id);

		if (!userSkill) {
			throw new AppError(NOT_FOUND, "User skill not found", 400);
		}

		return res.json(userSkill);
	}

	static async updateUserSkill(req, res) {
		const { id } = req.params;
		const { userId, skillId } = req.body;

		const oldUserSkill = await UsersSkillsService.findUserSkillById(id);

		if (!oldUserSkill) {
			throw new AppError(NOT_FOUND, "User skill not found to update", 400);
		}

		oldUserSkill.userId = userId;
		oldUserSkill.skillId = skillId;

		const newUserSkill = oldUserSkill.save();

		return res.json({ message: "Updated" });
	}

	static async deleteUserSkill(req, res) {
		const { id } = req.params;

		const deleted = await UsersSkillsService.deleteUserSkill(id);

		if (!deleted) {
			throw new AppError(BAD_REQUEST, "Cannot delete user skill", 400);
		}

		return res.json({ message: "User skill deleted" });
	}
}

module.exports = UsersSkillsController;
