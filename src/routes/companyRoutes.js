const companyRoutes = require('express').Router();
const Company = require('../controllers/companyController');
const authMiddleware = require('../middlewares/authMiddlewares');

companyRoutes.post('/profile', authMiddleware, Company.createCompanyProfile);
companyRoutes.post('/vacancy', authMiddleware, Company.createVacancy);
companyRoutes.get('/vacancies', authMiddleware, Company.getMyVacancies);

module.exports = companyRoutes;
