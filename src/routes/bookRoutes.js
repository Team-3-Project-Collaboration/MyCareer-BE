const bookRoutes = require('express').Router();
const authMiddleware = require('../middlewares/authMiddlewares');
const Booking = require('../controllers/bookingController');


bookRoutes.post("/", authMiddleware, Booking.createBooking);
bookRoutes.get("/me", authMiddleware, Booking.getMyBookings);
bookRoutes.get("/mentor", authMiddleware, Booking.getMentorBookings);
bookRoutes.put("/:id/payment-status", authMiddleware, Booking.updatePaymentStatus);

module.exports = bookRoutes;