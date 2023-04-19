const {
	User_PersonalQuality,
	PersonalQualities,
	Users,
	Documents,
	Roles,
	Departments,
	Universities,
	Institutes,
	Educations,
	Locations,
} = require("../models");

class UsersPersonalQualityService {
	static async findAllUserPersonalQuality() {
		return User_PersonalQuality.findAll({
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
					model: PersonalQualities,
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

	static async findUserPersonalQualityById(id) {
		return User_PersonalQuality.findOne({
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
					model: PersonalQualities,
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
}

module.exports = UsersPersonalQualityService;
