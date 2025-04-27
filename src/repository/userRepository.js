const prisma = require('../config/database');

class userRepository {
    constructor() {
        this.usersModel = prisma.user;
    }

    async createUser({ email, name, password, dob, province, city, district, gender }) {
        try {
            const newUser = await this.usersModel.create({
                data: { email, name, password, dob: new Date(dob), province, city, district, gender }
            });
            return newUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findUserByEmail(email) {
        const user = await this.usersModel.findUnique({ where: { email } });
        return user;
    }

    async findUserById(id) {
        const user = await this.usersModel.findUnique({
            where: { id: +id }
        });
        return user;
    }


    async deleteUser(id) {
        const deletedUser = await this.usersModel.delete({
            where: {
                id: +id,
            }
        })
        return deletedUser;
    }

    async updateUser(id, updates) {
        const data = Object.fromEntries(
            Object.entries(updates).filter(([_, v]) => v !== undefined && v !== null)
        );

        if (Object.keys(data).length === 0) {
            throw new Error('data not found');
        }

        if (data.dob) data.dob = new Date(data.dob);

        return this.usersModel.update({
            where: { id: +id },
            data
        });
    }

    async getAllUsers() {
        const users = await this.usersModel.findMany();
        return users;
    }

}

module.exports = new userRepository();
