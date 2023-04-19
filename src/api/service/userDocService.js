const {
	User_Documents,
	Users,
	Documents,
	Roles,
	Departments,
	Universities,
	Institutes,
	Educations,
	Locations,
} = require("../models");

class UserDocumentService {
	static async createUserDocument(userId, documentId) {
		return User_Documents.create({ userId, documentId });
	}

	static async findAllUsersDocuments() {
		return User_Documents.findAll({
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
					model: Documents,
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

	static async findUserDocById(id) {
		return User_Documents.findOne({
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
					model: Documents,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
		});
	}

	static async deleteUserDocument(id) {
		return User_Documents.destroy({
			where: { id },
		});
	}
}

module.exports = UserDocumentService;
