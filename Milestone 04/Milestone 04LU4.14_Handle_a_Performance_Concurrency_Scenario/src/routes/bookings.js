import express from 'express';
import { bookingLimiter } from '../middleware/rateLimiter.js';
import { createBooking } from '../services/bookings.js';

const router = express.Router();

router.post('/book', bookingLimiter, async (req, res, next) => {
  try {
    const { userId, seatId, showId } = req.body;
    const booking = await createBooking({ userId, seatId, showId });
    return res.status(201).json(booking);
  } catch (error) {
    if (error.statusCode === 409 || error.code === 'P2002') {
      return res.status(409).json({ message: 'Seat already booked for this show' });
    }
    next(error);
  }
});

export default router;