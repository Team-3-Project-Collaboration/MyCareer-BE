const userRouter = require('express').Router();
const User = require('../controllers/userController');
const authMiddlewares = require('../middlewares/authMiddlewares')

userRouter.get('/', User.getAllUser);
userRouter.get('/:id', User.findUserById);
userRouter.delete('/:id', User.deleteUser);
userRouter.patch('/me', authMiddlewares, User.updateUser);


module.exports = userRouter;