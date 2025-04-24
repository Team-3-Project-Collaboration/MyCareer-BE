const response = require('../utils/response')
const userRepository = require('../repository/userRepository')
const bcrypt = require('bcrypt');

class User {

    async getAllUser(req, res) {
        try {
            const users = await userRepository.getAllUsers();
            return response({ res, code: 200, message: 'Get all users success', data: users });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }



    async updateUser(req, res) {
        try {
            // const { id } = req.params;
            const { id } = req.userData;

            const allowed = ['email', 'name', 'password', 'dob',
                'province', 'city', 'district', 'gender'];
            const updates = {};

            allowed.forEach(f => {
                if (req.body[f] !== undefined) updates[f] = req.body[f];
            });

            if (updates.password) {
                updates.password = await bcrypt.hash(updates.password, 10);
            }

            const updated = await userRepository.updateUser(id, updates);
            return response({
                res,
                code: 200,
                message: 'User updated successfully',
                data: updated
            });
        } catch (err) {
            return response({
                res,
                code: 400,
                message: err.message || 'Internal server error',
                data: null
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            console.log("ini id delete", id)
            const deletedUser = await userRepository.deleteUser(+id);
            if (!deletedUser) {
                return response({ res, code: 404, message: 'User not found', data: null });
            }
            return response({ res, code: 200, message: 'User deleted successfully', data: deletedUser });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

    async findUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await userRepository.findUserById(id);
            if (!user) {
                return response({ res, code: 404, message: 'User not found', data: null });
            }
            return response({ res, code: 200, message: 'User found', data: user });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }

}

module.exports = new User();
