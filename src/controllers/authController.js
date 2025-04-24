const userRepository = require('../repository/userRepository')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const response = require('../utils/response')

console.log('AuthController loaded');

class Auth {
    async register(req, res) {
        try {
            const { email, name, password, dob, province, city, district, gender } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);

            const existingUser = await userRepository.findUserByEmail(email);

            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = await userRepository.createUser({ email, name, password: hashedPassword, dob, province, city, district, gender });
            return response({ res, data: newUser, code: 201, message: 'User created successfullys' })
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error', error: error.message });
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

            res.status(200).json({
                message: "Login successful",
                data: {
                    id: user.id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    city: user.city,
                    province: user.province,
                    district: user.district,
                    gender: user.gender,
                    token: token
                }
            });

        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async me(req, res) {
        const { id } = req.userData;

        try {
            const user = await userRepository.getUserById(id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            return res.status(200).json({
                message: "Get current user success",
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                message: "Server error",
                error: error.message
            });
        }
    }
}

module.exports = new Auth();