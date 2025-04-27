const response = require("../utils/response");
const quizRepository = require("../repository/quizRepository");

class QuizController {
    async createQuiz(req, res) {
        try {
            const { moduleId, quizName } = req.body;

            const newQuiz = await quizRepository.createQuiz({ moduleId, quizName });

            return response({ res, code: 201, message: "Quiz created successfully", data: newQuiz });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getQuizByModule(req, res) {
        try {
            const { moduleId } = req.params;

            const quizData = await quizRepository.getQuizByModuleId(moduleId);

            return response({ res, code: 200, message: "Get quiz success", data: quizData });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async addQuestion(req, res) {
        try {
            const { quizId, question } = req.body;

            const newQuestion = await quizRepository.addQuestion({ quizId, question });

            return response({ res, code: 201, message: "Question added successfully", data: newQuestion });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async addChoice(req, res) {
        try {
            const { questionId, choice, isCorrect } = req.body;

            const newChoice = await quizRepository.addChoice({ questionId, choice, isCorrect });

            return response({ res, code: 201, message: "Choice added successfully", data: newChoice });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async deleteQuiz(req, res) {
        try {
            const { id } = req.params;

            const deleted = await quizRepository.deleteQuiz(id);

            return response({ res, code: 200, message: "Quiz deleted successfully", data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async deleteQuestion(req, res) {
        try {
            const { id } = req.params;

            const deleted = await quizRepository.deleteQuestion(id);

            return response({ res, code: 200, message: "Question deleted successfully", data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async deleteChoice(req, res) {
        try {
            const { id } = req.params;

            const deleted = await quizRepository.deleteChoice(id);

            return response({ res, code: 200, message: "Choice deleted successfully", data: deleted });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async submitQuiz(req, res) {
        try {
            const { quizId, answers } = req.body;

            if (!quizId || !Array.isArray(answers)) {
                return response({ res, code: 400, message: "quizId and answers are required", data: null });
            }

            let correctAnswers = 0;

            for (const answer of answers) {
                const choice = await quizRepository.getChoiceById(answer.choiceId);

                if (choice && choice.isCorrect) {
                    correctAnswers++;
                }
            }

            const totalQuestions = answers.length;
            const score = correctAnswers * 10;

            return response({
                res,
                code: 200,
                message: "Quiz submitted successfully",
                data: {
                    totalQuestions,
                    correctAnswers,
                    score,
                }
            });

        } catch (error) {
            return response({ res, code: 500, message: "Internal server error", data: null, error: error.message });
        }
    }
}

module.exports = new QuizController();
