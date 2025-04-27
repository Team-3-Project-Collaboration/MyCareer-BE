const response = require("../utils/response");
const mentorRepository = require("../repository/mentorRepository");

class Mentor {
    async createMentorProfile(req, res) {
        try {
            const { id } = req.userData;
            const { bio, expertise, pricePerHour } = req.body;

            if (!bio || !expertise || !pricePerHour) {
                return response({ res, code: 400, message: 'Missing required fields', data: null });
            }

            const newProfile = await mentorRepository.createMentorProfile({
                userId: +id,
                bio,
                expertise,
                pricePerHour
            });

            return response({ res, code: 201, message: 'Mentor profile created successfully', data: newProfile });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getMentorProfile(req, res) {
        try {
            const { id } = req.userData;
            const profile = await mentorRepository.getMentorProfileByUserId(id);

            if (!profile) {
                return response({ res, code: 404, message: 'Mentor profile not found', data: null });
            }

            return response({ res, code: 200, message: 'Get mentor profile success', data: profile });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async updateMentorProfile(req, res) {
        try {
            const { id } = req.userData;
            const { bio, expertise, pricePerHour } = req.body;

            if (!bio && !expertise && !pricePerHour) {
                return response({ res, code: 400, message: 'No updates provided', data: null });
            }

            const updatedProfile = await mentorRepository.updateMentorProfile(id, {
                bio,
                expertise,
                pricePerHour
            });

            return response({ res, code: 200, message: 'Mentor profile updated successfully', data: updatedProfile });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }
}

module.exports = new Mentor();
