const prisma = require('../config/database');

console.log("module loaded ")

class moduleRepository {
    constructor() {
        this.moduleModel = prisma.module;
        this.userModule = prisma.userModule;
        this.ModulePurchase = prisma.modulePurchase;
    }

    async createModule({ name, creator, level, price, type }) {
        try {
            const newModule = await this.moduleModel.create({
                data: { name, creator, level, price, type }
            });
            return newModule;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async getAllmodule() {
        const module = await this.moduleModel.findMany()
        return module;
    }

    async findmoduleById(id) {
        const module = await this.moduleModel.findUnique({
            where: { id: +id }
        });
        return module;
    }

    async updateModule(id, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        return this.moduleModel.update({
            where: { id: +id },
            data: data
        });
    }

    async deleteModule(id) {
        const deletemodule = await this.moduleModel.delete({
            where: {
                id: +id,
            }
        })
        return deletemodule;
    }

    async getMyModule(id) {
        const module = await this.userModule.findMany({
            where: { userId: +id }
        });
        return module;
    }

    async addUserModule({ userId, moduleId, progres }) {
        console.log("dari usermodule", userId)
        const userModule = await this.userModule.create({
            data: {
                userId,
                moduleId,
                progres
            }
        });
        return userModule
    }

    async addModulePurchase({ idTransaction, userId, moduleId, pricePaid, paymentMethod, status }) {
        const modulePurchase = await this.ModulePurchase.create({
            data: { idTransaction, userId, moduleId, pricePaid, paymentMethod, status }
        })
        return modulePurchase
    }

    async searchModules({ name, type, level }) {
        const filters = {};

        if (name) {
            filters.name = { contains: name, mode: 'insensitive' };
        }
        if (type) {
            filters.type = type;
        }
        if (level) {
            filters.level = level;
        }

        const modules = await this.moduleModel.findMany({
            where: filters
        });

        return modules;
    }


}

module.exports = new moduleRepository();