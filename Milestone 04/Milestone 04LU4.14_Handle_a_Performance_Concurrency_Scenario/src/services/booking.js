import { PrismaClient } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

export const createBooking = async ({ userId, seatId, showId }) => {
  try {
    const booking = await prisma.booking.create({
      data: { userId, seatId, showId }
    });
    return booking;
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      const err = new Error('Seat already booked for this show');
      err.statusCode = 409;
      err.code = 'P2002';
      throw err;
    }
    throw error;
  }
};