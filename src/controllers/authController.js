const userRepository = require('../repository/userRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response')


class Auth {
    async register(req, res) {
        try {
            const { email, name, password, dob, province, city, district, gender, role } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await userRepository.findUserByEmail(email);

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = await userRepository.createUser({ email, name, password: hashedPassword, dob, province, city, district, gender, role });
            return response({ res, data: newUser, code: 201, message: 'User created successfully' })
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userRepository.findUserByEmail(email);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Wrong password" });
            }

            const payload = {
                id: user.id,
                name: user.username,
                email: user.email,
                role: user.role,
                city: user.city,
                province: user.province,
                district: user.district,
                gender: user.gender
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET);
            // const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "5h" });

            return response({
                res,
                code: 200,
                message: 'Login successful',
                data: {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    city: user.city,
                    province: user.province,
                    district: user.district,
                    gender: user.gender,
                    token: token,
                },
            });

        } catch (error) {
            return response({ res, code: 500, message: error, data: null });
        }
    }

    async me(req, res) {
        const { id } = req.userData;
        console.log("ini id", id)

        try {
            const user = await userRepository.findUserById(id);

            if (!user) {
                return response({ res, code: 404, message: "User not found", data: null });
            }
            return response({ res, data: user, code: 200, message: "Get current user success" })

        } catch (error) {
            return response({ res, code: 500, message: error, data: null });
        }
    }
}

module.exports = new Auth();