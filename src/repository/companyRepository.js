const prisma = require('../config/database');

class CompanyRepository {
    constructor() {
        this.companyModel = prisma.company;
    }

    async createCompany({ userId, name, image, description, address }) {
        try {
            const newCompany = await this.companyModel.create({
                data: { userId, name, image, description, address }
            });
            return newCompany;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getCompanyByUserId(userId) {
        try {
            const comapny = await this.companyModel.findUnique({
                where: { userId: +userId },
            });
            return comapny;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

module.exports = new CompanyRepository();
