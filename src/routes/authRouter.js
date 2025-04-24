const authRouter = require('express').Router();
const Auth = require('../controllers/authController');

authRouter.post('/register', Auth.register);
authRouter.post('/login', Auth.login);


module.exports = authRouter;