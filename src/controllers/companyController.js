const response = require('../utils/response');
const companyRepository = require('../repository/companyRepository');
const vacancyRepository = require('../repository/vacancyRepository')
console.log("comapnya loaded")

class CompanyController {
    async createCompanyProfile(req, res) {
        try {
            const { id } = req.userData;
            const { name, image, description, address } = req.body;

            const existingCompany = await companyRepository.getCompanyByUserId(+id);
            if (existingCompany) {
                return response({ res, code: 400, message: 'Company profile already exists', data: null });
            }

            const company = await companyRepository.createCompany({
                userId: +id,
                name,
                image,
                description,
                address
            });
            console.log(company)
            return response({ res, code: 201, message: 'Company profile created', data: company });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async createVacancy(req, res) {
        try {
            const { id } = req.userData;
            const { title, description, location, salary, jobType, jobField } = req.body;

            const company = await companyRepository.getCompanyByUserId(id);
            if (!company) {
                return response({ res, code: 404, message: 'Company profile not found', data: null });
            }

            const vacancy = await vacancyRepository.createVacancy({
                companyId: company.id,
                title,
                description,
                location,
                salary,
                jobType,
                jobField,
                companyName: company.name
            })

            return response({ res, code: 201, message: 'Vacancy created', data: vacancy });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getMyVacancies(req, res) {
        try {
            const { id } = req.userData;

            const company = await companyRepository.getCompanyByUserId(id);
            if (!company) {
                return response({ res, code: 404, message: 'Company profile not found', data: null });
            }

            const vacancies = await vacancyRepository.getAllVacanciesByCompany(company.id);

            return response({ res, code: 200, message: 'List of vacancies', data: vacancies });
        } catch (error) {
            return response({ res, code: 500, message: 'Internal server error', data: null, error: error.message });
        }
    }
}

module.exports = new CompanyController();
