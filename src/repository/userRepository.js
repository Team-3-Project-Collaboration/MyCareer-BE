const prisma = require('../config/database');

class userRepository {
    constructor() {
        this.usersModel = prisma.user;
    }

    async findUserByEmail(email) {
        const user = await this.usersModel.findUnique({ where: { email } });
        return user;
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

    async getUserById(id) {
        const user = await this.usersModel.findUnique({
            where: {
                id: id,
            }
        })
        return user;
    }
}

module.exports = new userRepository();
