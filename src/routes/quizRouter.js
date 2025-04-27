const quizRouter = require('express').Router();
const Quiz = require('../controllers/quizController');
const authMiddlewares = require('../middlewares/authMiddlewares')


quizRouter.post('/', Quiz.createQuiz);
quizRouter.post('/question', Quiz.addQuestion);
quizRouter.post('/choice', Quiz.addChoice);
quizRouter.post('/submit', Quiz.submitQuiz);
quizRouter.get('/:moduleId', Quiz.getQuizByModule);
quizRouter.delete('/:id', Quiz.deleteQuiz);
quizRouter.delete('/question/:id', Quiz.deleteQuestion);
quizRouter.delete('/choice/:id', Quiz.deleteChoice);

module.exports = quizRouter;
