const prisma = require('../config/database');

class QuizRepository {
    constructor() {
        this.quizModel = prisma.quiz;
        this.questionModel = prisma.question;
        this.choiceModel = prisma.choices;
    }

    async createQuiz({ moduleId, quizName }) {
        return this.quizModel.create({
            data: { moduleId, quizName }
        });
    }

    async getQuizByModuleId(moduleId) {
        return this.quizModel.findMany({
            where: { moduleId: +moduleId },
            include: {
                questions: {
                    include: {
                        Choices: true
                    }
                }
            }
        });
    }

    async addQuestion({ quizId, question }) {
        return this.questionModel.create({
            data: { quizId, question }
        });
    }

    async addChoice({ questionId, choice, isCorrect }) {
        return this.choiceModel.create({
            data: { questionId, choice, isCorrect }
        });
    }

    async deleteQuiz(id) {
        return this.quizModel.delete({
            where: { id: +id }
        });
    }

    async deleteQuestion(id) {
        return this.questionModel.delete({
            where: { id: +id }
        });
    }

    async deleteChoice(id) {
        return this.choiceModel.delete({
            where: { id: +id }
        });
    }

    async getChoiceById(id) {
        return this.choiceModel.findUnique({
            where: { id: +id },
        });
    }
}

module.exports = new QuizRepository();
