const { Studies_Subjects } = require("../models");

class StudySubjectService {
	static async deleteStudySubject({ id, studyId }) {
		const where = {};
		if (id) where.id = id;
		if (studyId) where.studyId = studyId;
		return await Studies_Subjects.findAll({ where }).then((ss) => {
			ss.map((e) => {
				e.where = null;
				e.save();
			});
		});
	}
}

module.exports = StudySubjectService;
