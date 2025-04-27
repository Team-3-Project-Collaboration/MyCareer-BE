const applicationRoutes = require('express').Router();
const Application = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddlewares');


applicationRoutes.post('/', authMiddleware, Application.addApplication);
applicationRoutes.get('/', authMiddleware, Application.getAllApplications);
applicationRoutes.get('/me', authMiddleware, Application.getMyApplications);
applicationRoutes.get('/:id', authMiddleware, Application.getApplicationById);
// applicationRoutes.put('/:id', authMiddleware, Application.updateApplication);
// applicationRoutes.delete('/:id', authMiddleware, Application.deleteApplication);

module.exports = applicationRoutes;
