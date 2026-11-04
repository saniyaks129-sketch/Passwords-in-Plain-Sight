import express from 'express';
import {
  getMyProfile,
  getAllUsers,
  updateUserRole,
} from '../controllers/userController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// 1. View own profile (user, manager, admin)
router.get(
  '/me',
  authMiddleware,
  requireRole('user', 'manager', 'admin'),
  getMyProfile
);

// 2. View all users (admin only)
router.get(
  '/',
  authMiddleware,
  requireRole('admin'),
  getAllUsers
);

// 3. Change a user's role (admin only)
router.put(
  '/:id/role',
  authMiddleware,
  requireRole('admin'),
  updateUserRole
);

export default router;