const response = require("../utils/response");
const experienceRepository = require("../repository/experienceRepository");

console.log('Experience Controller loaded');
class experience {
    async addExperience(req, res) {
        try {
            const { id } = req.userData;
            const { jobTitle, companyName, startDate, endDate } = req.body;
            const newExperience = await experienceRepository.createExperience({
                userId: id,
                jobTitle,
                companyName,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            });
            return response({ res, data: newExperience, code: 201, message: 'Experience created successfully' });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async getAllExperience(req, res) {
        try {
            const experience = await experienceRepository.getAllExperience()

            if (!experience) {
                return response({ res, code: 404, message: 'experience not found', data: null })
            }

            return response({ res, code: 200, message: 'Get all experience success', data: experience });
        } catch (error) {

            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async findExperienceById(req, res) {
        try {
            const { id } = req.params;
            const experience = await experienceRepository.findExperienceById(id);
            if (!experience) {
                return response({ res, code: 404, message: 'Experience not found', data: null })
            }
            return response({ res, code: 200, message: 'Get experience by id success', data: experience });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async getMyExperience(req, res) {
        try {
            const { id } = req.userData;
            const experience = await experienceRepository.getMyExperience(id);
            return response({ res, code: 200, message: "Get my experience success", data: experience });
        } catch (error) {
            return response({ res, code: 500, message: "Internal server error", data: null, error: error.message });
        }
    }

    async updateExperience(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updated = await experienceRepository.updateExperience(id, updates);

            return response({ res, code: 200, message: 'Experience updated successfully', data: updated });
        } catch (err) {
            return response({ res, code: 400, message: err.message || 'Internal server error', data: null });
        }
    }

    async deleteExperience(req, res) {
        try {
            const { id } = req.params;
            const deleted = await experienceRepository.deleteExperience(+id)
            if (!deleted) {
                return response({ res, code: 404, message: 'experience not found', data: null });
            }
            return response({ res, code: 200, message: 'experience deleted successfully', data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });

        }
    }

}

module.exports = new experience();
