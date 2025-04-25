const educationRouter = require('express').Router();
const Education = require('../controllers/educationController');
const authMiddlewares = require('../middlewares/authMiddlewares')


educationRouter.post('/', authMiddlewares, Education.addEducation);
educationRouter.get('/', authMiddlewares, Education.getAllEducation);
// kesalahan
educationRouter.get('/me', authMiddlewares, Education.getMyEducation);
educationRouter.get('/:id', authMiddlewares, Education.findEducationById);
educationRouter.delete('/me/:id', authMiddlewares, Education.deleteEducation);
educationRouter.patch('/:id', authMiddlewares, Education.updateEducation);

module.exports = educationRouter;