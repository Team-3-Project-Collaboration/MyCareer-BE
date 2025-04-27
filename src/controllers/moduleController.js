const response = require("../utils/response");
const moduleRepository = require("../repository/moduleRepository");
const generateTransactionId = require("../utils/generateTransactionId");


class Module {
    async addModule(req, res) {
        try {
            const { name, creator, level, price, type } = req.body;
            const newModule = await moduleRepository.createModule({
                name,
                creator,
                level,
                price,
                type
            });
            return response({ res, data: newModule, code: 201, message: 'Module created successfully' });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async getAllModule(req, res) {
        try {
            const module = await moduleRepository.getAllmodule()

            if (!module) {
                return response({ res, code: 404, message: 'module not found', data: null })
            }

            return response({ res, code: 200, message: 'Get all module success', data: module });
        } catch (error) {

            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async findModuleById(req, res) {
        try {
            const { id } = req.params;
            const module = await moduleRepository.findmoduleById(id);
            if (!module) {
                return response({ res, code: 404, message: 'module not found', data: null })
            }
            return response({ res, code: 200, message: 'Get module by id success', data: module });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal btid error', data: null, error: error.message });
        }
    }

    // Delete module
    async deleteModule(req, res) {
        try {
            const { id } = req.params;
            console.log("ini dari delete", id)
            const deleted = await moduleRepository.deleteModule(+id)
            if (!deleted) {
                return response({ res, code: 404, message: 'Module not found', data: null });
            }
            return response({ res, code: 200, message: 'Module deleted successfully', data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });

        }
    }

    // Update module
    async updateModule(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const updated = await moduleRepository.updateModule(id, updates);

            return response({ res, code: 200, message: 'Module updated successfully', data: updated });
        } catch (err) {
            return response({ res, code: 400, message: err.message || 'Internal server error', data: null });
        }
    }


    // Beli Module
    async userBuyModule(req, res) {
        try {
            const { id } = req.userData;
            const { moduleId } = req.params;
            const { progres = 0, pricePaid, paymentMethod = "CREDIT_CARD" } = req.body;

            const status = "SUCCESS";
            const idTransaction = generateTransactionId(id, moduleId);

            const newUserModule = await moduleRepository.addUserModule({
                userId: +id,
                moduleId: +moduleId,
                progres,
            });

            const modulePurchase = await moduleRepository.addModulePurchase({
                idTransaction,
                userId: +id,
                moduleId: +moduleId,
                pricePaid,
                paymentMethod,
                status
            });

            const purchasedAt = new Date(modulePurchase.purchasedAt);
            const date = purchasedAt.toISOString().split('T')[0];
            const time = purchasedAt.toTimeString().split(' ')[0];

            return response({
                res, code: 200, message: "Buy module success", data: {
                    idTransaction: idTransaction,
                    Amount: modulePurchase.pricePaid,
                    paymentMethod: modulePurchase.paymentMethod,
                    date: date,
                    time: time
                }
            });
        } catch (error) {
            return response({ res, code: 400, message: error.message || 'Internal server error', data: null });
        }
    }

    async addPurchase(req, res) {
        try {
            const { id } = req.userData;
            const { moduleId, pricePaid, purchasedAt, paymentMethod, status } = req.body;
            const modulePurchase = await moduleRepository.addModulePurchase({
                userId: +id,
                moduleId,
                pricePaid,
                purchasedAt,
                paymentMethod,
                status
            })

            return response({ res, code: 200, message: "Buy module success", data: modulePurchase })

        } catch (error) {
            return response({ res, code: 400, message: error.message || 'Internal server error', data: null });

        }
    }

    async getMyModule(req, res) {
        try {
            const { id } = req.userData;
            const module = await moduleRepository.getMyModule(id);
            return response({ res, code: 200, message: "Get my module success", data: module });
        } catch (error) {
            return response({ res, code: 500, message: "Internal server error", data: null, error: error.message });
        }
    }

    async searchModules(req, res) {
        try {
            const { name, type, level } = req.query;

            const modules = await moduleRepository.searchModules({
                name,
                type,
                level
            });

            return response({ res, code: 200, message: "Search modules success", data: modules });
        } catch (error) {
            return response({ res, code: 500, message: "Internal server error", data: null, error: error.message });
        }
    }


}

module.exports = new Module();
