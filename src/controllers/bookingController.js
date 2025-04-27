const response = require("../utils/response");
const bookingRepository = require("../repository/bookRepository");



class Booking {
    async createBooking(req, res) {
        try {
            const { id } = req.userData;
            const { mentorId, scheduleDate, durationHours, totalPayment, paymentMethod } = req.body;

            if (!mentorId || !scheduleDate || !durationHours || !totalPayment || !paymentMethod) {
                return response({ res, code: 400, message: 'Missing required fields', data: null });
            }

            const booking = await bookingRepository.createBooking({
                userId: +id,
                mentorId,
                scheduleDate: new Date(scheduleDate),
                durationHours,
                totalPayment,
                paymentMethod
            });

            return response({ res, code: 201, message: 'Booking created successfully', data: booking });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getMyBookings(req, res) {
        try {
            const { id } = req.userData;
            const bookings = await bookingRepository.getMyBookings(id);

            return response({ res, code: 200, message: 'Get my bookings success', data: bookings });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async getMentorBookings(req, res) {
        try {
            const { id } = req.userData;
            const mentorProfile = await prisma.mentorProfile.findUnique({
                where: { userId: id }
            });

            if (!mentorProfile) {
                return response({ res, code: 404, message: 'Mentor profile not found', data: null });
            }

            const bookings = await bookingRepository.getMentorBookings(mentorProfile.id);

            return response({ res, code: 200, message: 'Get mentor bookings success', data: bookings });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const { id } = req.params;
            const { paymentStatus } = req.body;

            if (!paymentStatus) {
                return response({ res, code: 400, message: 'Payment status is required', data: null });
            }

            const updated = await bookingRepository.updatePaymentStatus(id, paymentStatus);

            return response({ res, code: 200, message: 'Payment status updated successfully', data: updated });
        } catch (error) {
            return response({ res, code: 500, message: error.message, data: null });
        }
    }
}

module.exports = new Booking();
