const prisma = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { Payment } = prisma;

class bookingRepository {
    constructor() {
        this.mentoringBookingModel = prisma.mentoringBooking;
        this.usersModel = prisma.user;
        this.mentorProfileModel = prisma.mentorProfile;
    }

    async sasas({ userId, mentorId, scheduleDate, durationHours, totalPayment, paymentMethod }) {
        try {
            const user = await this.usersModel.findUnique({
                where: { id: userId }
            });

            const mentorProfile = await this.mentorProfileModel.findUnique({
                where: { id: mentorId }
            });

            if (!user) {
                throw new Error('User not found');
            }

            if (!mentorProfile) {
                throw new Error('Mentor not found');
            }

            if (!Payment[paymentMethod]) {
                throw new Error('Invalid payment method');
            }

            const newBooking = await this.mentoringBookingModel.create({
                data: {
                    idBook: uuidv4(),
                    userId,
                    mentorProfileId: mentorId,
                    scheduleDate,
                    durationHours,
                    totalPayment,
                    paymentStatus: 'PENDING',
                    paymentMethod: Payment[paymentMethod]
                }
            });
            return newBooking;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    async createBooking({ userId, mentorId, scheduleDate, durationHours, totalPayment, paymentMethod }) {
        try {
            const user = await this.usersModel.findUnique({ where: { id: userId } });
            const mentorProfile = await this.mentorProfileModel.findUnique({ where: { id: mentorId } });

            if (!user) {
                throw new Error('User not found');
            }

            if (!mentorProfile) {
                throw new Error('Mentor not found');
            }

            if (!Object.values(Payment).includes(paymentMethod)) {
                throw new Error('Invalid payment method');
            }

            const newBooking = await this.mentoringBookingModel.create({
                data: {
                    idBook: uuidv4(),
                    userId,
                    mentorProfileId: mentorId,
                    scheduleDate,
                    durationHours,
                    totalPayment,
                    paymentStatus: PaymentStatusMentoring.PENDING,
                    paymentMethod
                }
            });
            return newBooking;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMyBookings(userId) {
        try {
            const bookings = await this.mentoringBookingModel.findMany({
                where: { userId },
                include: {
                    mentorProfile: { // fix disini
                        include: {
                            user: { // include info user dari mentorProfile
                                select: {
                                    id: true,
                                    name: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            });
            return bookings;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getMentorBookings(mentorId) {
        try {
            const bookings = await this.mentoringBookingModel.findMany({
                where: { mentorProfileId: mentorId }, // fix disini
                include: {
                    user: { // fix disini
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    }
                }
            });
            return bookings;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updatePaymentStatus(id, paymentStatus) {
        try {
            const updatedBooking = await this.mentoringBookingModel.update({
                where: { id: +id },
                data: { paymentStatus }
            });
            return updatedBooking;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new bookingRepository();
