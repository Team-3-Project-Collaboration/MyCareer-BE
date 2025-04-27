const applicationRoutes = require('express').Router();
const Application = require('../controllers/applicationController');
const authMiddleware = require('../middlewares/authMiddlewares');


applicationRoutes.post('/:id', authMiddleware, Application.addApplication);
applicationRoutes.get('/', authMiddleware, Application.getAllApplications);
applicationRoutes.get('/:id', authMiddleware, Application.getApplicationById);
applicationRoutes.get('/my', authMiddleware, Application.getMyApplications);
applicationRoutes.put('/:id', authMiddleware, Application.updateApplication);
applicationRoutes.delete('/:id', authMiddleware, Application.deleteApplication);

module.exports = applicationRoutes;
