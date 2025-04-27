const moduleRouter = require('express').Router();
const Module = require('../controllers/moduleController');
const authMiddlewares = require('../middlewares/authMiddlewares')


moduleRouter.post('/', authMiddlewares, Module.addModule);
// moduleRouter.post('/user', authMiddlewares, Module.userBuyModule);
moduleRouter.post('/:moduleId/purchase', authMiddlewares, Module.userBuyModule);
moduleRouter.get('/', authMiddlewares, Module.getAllModule);
moduleRouter.get('/me', authMiddlewares, Module.getMyModule);
moduleRouter.get('/:id', authMiddlewares, Module.findModuleById);
moduleRouter.delete('/:id', authMiddlewares, Module.deleteModule);
moduleRouter.patch('/:id', authMiddlewares, Module.updateModule);

module.exports = moduleRouter;

