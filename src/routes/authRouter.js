const authRouter = require('express').Router();
const Auth = require('../controllers/authController');
const authMiddlewares = require('../middlewares/authMiddlewares')

authRouter.post('/register', Auth.register);
authRouter.post('/login', Auth.login);
authRouter.get('/me', authMiddlewares, Auth.me);


module.exports = authRouter;