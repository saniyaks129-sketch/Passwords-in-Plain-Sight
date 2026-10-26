import rateLimit from 'express-rate-limit';

export const bookingLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: 'Too many booking requests from this IP, please try again after a minute' },
  standardHeaders: true,
  legacyHeaders: false,
});