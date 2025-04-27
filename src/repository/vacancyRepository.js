const prisma = require('../config/database');

class vacancyRepository {
    constructor() {
        this.vacancyModel = prisma.vacancy;
    }

    async createVacancy({ companyId, title, description, location, salary, companyName, jobType, jobField }) {
        try {
            const newVacancy = await this.vacancyModel.create({
                data: { companyId, title, description, location, salary, companyName, jobType, jobField }
            });
            return newVacancy;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllVacanciesByCompany(companyId) {
        try {
            const vacancy = await this.vacancyModel.findMany({
                where: { companyId: +companyId },
            });
            return vacancy;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllVacancies() {
        try {
            const vacancy = await this.vacancyModel.findMany();
            return vacancy;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new vacancyRepository();
