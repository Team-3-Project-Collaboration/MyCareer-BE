const prisma = require('../config/database');

class experienceRepository {
    constructor() {
        this.experienceModel = prisma.experience;
    }

    async createExperience({ userId, jobTitle, companyName, startDate, endDate }) {
        try {
            const newExperience = await this.experienceModel.create({
                data: { userId, jobTitle, companyName, startDate: new Date(startDate), endDate: new Date(endDate) }
            });
            return newExperience;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getAllExperience() {
        const experience = await this.experienceModel.findMany()
        return experience;
    }

    async findExperienceById(id) {
        const experience = await this.experienceModel.findUnique({
            where: { id: +id }
        });
        return experience;
    }

    async getMyExperience(id) {
        const experience = await this.experienceModel.findMany({
            where: { userId: +id }
        });
        return experience;
    }


    async updateExperience(id, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        return this.experienceModel.update({
            where: { id: +id },
            data: data
        });
    }

    async deleteExperience(id) {
        const deleteExperience = await this.experienceModel.delete({
            where: {
                id: +id,
            }
        })
        return deleteExperience;
    }

}

module.exports = new experienceRepository();