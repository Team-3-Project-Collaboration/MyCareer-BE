const experienceRouter = require('express').Router();
const Experience = require('../controllers/experienceController');
const authMiddlewares = require('../middlewares/authMiddlewares')


experienceRouter.post('/', authMiddlewares, Experience.addExperience);
experienceRouter.get('/', authMiddlewares, Experience.getAllExperience);
// kesalahan
experienceRouter.get('/me', authMiddlewares, Experience.getMyExperience);
experienceRouter.get('/:id', authMiddlewares, Experience.findExperienceById);
experienceRouter.delete('/me/:id', authMiddlewares, Experience.deleteExperience);
experienceRouter.patch('/:id', authMiddlewares, Experience.updateExperience);

module.exports = experienceRouter;