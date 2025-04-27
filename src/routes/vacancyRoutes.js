const vacancyRoutes = require('express').Router();
const Vacancy = require('../controllers/vacancyController');
const authMiddleware = require('../middlewares/authMiddlewares');

vacancyRoutes.get('/', authMiddleware, Vacancy.getAllVacancy);

module.exports = vacancyRoutes;
