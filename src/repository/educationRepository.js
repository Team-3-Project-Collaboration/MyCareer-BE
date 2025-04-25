const prisma = require('../config/database');
const response = require('../utils/response');

class educationRepository {
    constructor() {
        this.educationModel = prisma.education;
    }

    async createEducation({ userId, degree, institution, startDate, endDate }) {
        try {
            const newEducation = await this.educationModel.create({
                data: { userId, degree, institution, startDate: new Date(startDate), endDate: new Date(endDate) }
            });
            return newEducation;
        } catch (error) {
            console.log("Error in createEducation:", error);
            throw new Error(error.message);
        }

    }

    async getAllEducation() {
        const education = await this.educationModel.findMany()
        return education;
    }

    async findEducationById(id) {
        const education = await this.educationModel.findUnique({
            where: { id: +id }
        });
        return education;
    }

    async getMyEducation(id) {
        console.log("ini darimana", id)
        const education = await this.educationModel.findMany({
            where: { userId: +id }
        });
        return education;
    }


    async updateEducation(id, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        return this.educationModel.update({
            where: { id: +id },
            data: data
        });
    }

    async deleteEducation(id) {
        const deleteEducation = await this.educationModel.delete({
            where: {
                id: +id,
            }
        })
        return deleteEducation;
    }

}

module.exports = new educationRepository();