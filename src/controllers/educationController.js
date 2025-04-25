const response = require("../utils/response");
const educationRepository = require("../repository/educationRepository");
// const userRepository = require("../repository/userRepository");
console.log('education loaded');
class education {
    async addEducation(req, res) {
        try {
            const { id } = req.userData;
            const { degree, institution, startDate, endDate } = req.body;
            const newEducation = await educationRepository.createEducation({
                userId: id,
                degree,
                institution,
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            });
            return response({ res, data: newEducation, code: 201, message: 'Education created successfully' });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async getAllEducation(req, res) {
        try {
            const education = await educationRepository.getAllEducation()

            if (!education) {
                return response({ res, code: 404, message: 'Education not found', data: null })
            }

            return response({ res, code: 200, message: 'Get all education success', data: education });
        } catch (error) {
            a
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async findEducationById(req, res) {
        try {
            const { id } = req.params;
            const education = await educationRepository.findEducationById(id);
            if (!education) {
                return response({ res, code: 404, message: 'Education not found', data: null })
            }
            return response({ res, code: 200, message: 'Get education by id success', data: education });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal btid error', data: null, error: error.message });
        }
    }

    async getMyEducation(req, res) {
        try {
            const { id } = req.userData;
            const education = await educationRepository.getMyEducation(id);
            return response({ res, code: 200, message: "Get my education success", data: education });
        } catch (error) {
            return response({ res, code: 500, message: "Internal server error", data: null, error: error.message });
        }
    }

    // async updateEducation(res, req) {
    //     try {
    //         const updates = {};
    //         const { id } = req.body;
    //         const updated = await educationRepository.updateEducation(id, updates)
    //         return response({ res, code: 200, message: "Get my education success", data: updated });
    //     } catch (error) {
    //         return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
    //     }
    // }

    async updateEducation(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updated = await educationRepository.updateEducation(id, updates);

            return response({ res, code: 200, message: 'Education updated successfully', data: updated });
        } catch (err) {
            return response({ res, code: 400, message: err.message || 'Internal server error', data: null });
        }
    }

    async deleteEducation(req, res) {
        try {
            const { id } = req.params;
            console.log("ini dari delete", id)
            const deleted = await educationRepository.deleteEducation(+id)
            if (!deleted) {
                return response({ res, code: 404, message: 'Education not found', data: null });
            }
            return response({ res, code: 200, message: 'Education deleted successfully', data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });

        }
    }

}

module.exports = new education();
