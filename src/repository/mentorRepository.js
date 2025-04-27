const prisma = require('../config/database');

class MentoringRepository {
    constructor() {
        this.mentorProfileModel = prisma.mentorProfile;
    }

    async createMentorProfile({ userId, bio, expertise, pricePerHour }) {
        try {
            const newProfile = await this.mentorProfileModel.create({
                data: {
                    userId,
                    bio,
                    expertise,
                    pricePerHour
                }
            });
            return newProfile;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMentorProfileByUserId(userId) {
        const profile = await this.mentorProfileModel.findUnique({
            where: { userId: +userId },
        });
        return profile;
    }

    async updateMentorProfile(userId, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        return this.mentorProfileModel.update({
            where: { userId: +userId },
            data: data,
        });
    } userModel
    userModel
}

module.exports = new MentoringRepository();
