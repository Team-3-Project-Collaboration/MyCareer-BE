const response = require("../utils/response");
const applicationRepository = require("../repository/applicationRepository");
console.log("appicarionloaded")
class application {
    async addApplication(req, res) {
        try {
            const { id } = req.userData;
            const { vacancyId, cv, portfolio } = req.body;

            const newApplication = await applicationRepository.createApplication({
                userId: +id,
                vacancyId,
                cv,
                portfolio,
            });

            return response({ res, data: newApplication, code: 201, message: 'Application created successfully' });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getAllApplications(req, res) {
        try {
            const applications = await applicationRepository.getAllApplications();

            if (!applications || applications.length === 0) {
                return response({ res, code: 404, message: 'Applications not found', data: null });
            }

            return response({ res, code: 200, message: 'Get all applications success', data: applications });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getApplicationById(req, res) {
        try {
            const { id } = req.params;
            const application = await applicationRepository.getApplicationById(id);

            if (!application) {
                return response({ res, code: 404, message: 'Application not found', data: null });
            }

            return response({ res, code: 200, message: 'Get application by id success', data: application });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getMyApplications(req, res) {
        console.log("haloo")
        try {
            const { id } = req.userData;
            const applications = await applicationRepository.getApplicationsByUserId(id);

            return response({ res, code: 200, message: 'Get my applications success', data: applications });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async updateApplication(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updated = await applicationRepository.updateApplication(id, updates);

            return response({ res, code: 200, message: 'Application updated successfully', data: updated });
        } catch (error) {
            return response({ res, code: 400, message: error.message, data: null });
        }
    }

    async deleteApplication(req, res) {
        try {
            const { id } = req.params;
            const deleted = await applicationRepository.deleteApplication(+id);

            if (!deleted) {
                return response({ res, code: 404, message: 'Application not found', data: null });
            }

            return response({ res, code: 200, message: 'Application deleted successfully', data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }
}

module.exports = new application();
