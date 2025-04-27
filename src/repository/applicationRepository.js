const prisma = require('../config/database');

class applicationRepository {
    constructor() {
        this.applicationModel = prisma.application;
    }

    async createApplication({ userId, vacancyId, cv, portfolio }) {
        try {
            const newApplication = await this.applicationModel.create({
                data: {
                    cv,
                    portfolio,
                    status: 'PENDING',
                    user: {
                        connect: { id: userId }
                    },
                    vacancy: {
                        connect: { id: vacancyId }
                    }
                }
            });
            return newApplication;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllApplications() {
        const applications = await this.applicationModel.findMany();
        return applications;
    }

    async getApplicationById(id) {
        const application = await this.applicationModel.findUnique({
            where: { id: +id },
        });
        return application;
    }

    async getApplicationsByUserId(userId) {
        const applications = await this.applicationModel.findMany({
            where: { userId: +userId },
        });
        return applications;
    }

    async updateApplication(id, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        return this.applicationModel.update({
            where: { id: +id },
            data: data,
        });
    }

    async deleteApplication(id) {
        const deleteApplication = await this.applicationModel.delete({
            where: { id: +id },
        });
        return deleteApplication;
    }
}

module.exports = new applicationRepository();
