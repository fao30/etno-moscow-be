const {
	Users_Skills,
	Skills,
	Users,
	Documents,
	Roles,
	Departments,
	Universities,
	Institutes,
	Educations,
	Locations,
} = require("../models");

class UserSkillService {
	static async createUserSkill({ user_id, skill_id }) {
		return Users_Skills.create({ user_id, skill_id });
	}

	static async findAllUsersSkill() {
		return Users_Skills.findAll({
			include: [
				{
					model: Users,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: Roles,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Departments,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Institutes,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Universities,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Educations,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Locations,
							// as: "location",
							through: {
								attributes: [],
							},
						},
						{
							model: Documents,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
					],
				},
				{
					model: Skills,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: ["id", "name", "isHardSkill", "link"],
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async findUserSkillById(id) {
		return Users_Skills.findOne({
			where: { id },
			include: [
				{
					model: Users,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: Roles,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Departments,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Institutes,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Universities,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Educations,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
						{
							model: Locations,
							as: "location",
							through: {
								attributes: [],
							},
						},
						{
							model: Documents,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						},
					],
				},
				{
					model: Skills,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
	}

	static async deleteUserSkill(id) {
		return Users_Skills.destroy({
			where: { id },
		});
	}

	static async deleteUserSkillBySkillId(id) {
		return Users_Skills.destroy({ where: { skillId: id } });
	}
}

module.exports = UserSkillService;
