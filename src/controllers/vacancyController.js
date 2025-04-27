const response = require('../utils/response');
const vacancyRepository = require('../repository/vacancyRepository')
console.log("vacancy loaded")

class VacancyController {
    async getAllVacancy(req, res) {
        try {
            const vacancy = await vacancyRepository.getAllVacancies()
            return response({ res, code: 200, message: 'List of vacancies', data: vacancy });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

}

module.exports = new VacancyController();
