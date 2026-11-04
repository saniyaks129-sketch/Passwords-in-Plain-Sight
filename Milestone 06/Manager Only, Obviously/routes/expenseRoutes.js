import express from 'express';
import {
  createExpense,
  getMyExpenses,
  getAllExpenses,
  approveExpense,
  rejectExpense,
  updateExpense,
  deleteExpense,
} from '../controllers/expenseController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// 1. Submit an expense (user, manager, admin)
router.post(
  '/',
  authMiddleware,
  requireRole('user', 'manager', 'admin'),
  createExpense
);

// 2. View own expenses (user, manager, admin)
router.get(
  '/mine',
  authMiddleware,
  requireRole('user', 'manager', 'admin'),
  getMyExpenses
);

// 3. View ALL expenses (manager, admin)
router.get(
  '/',
  authMiddleware,
  requireRole('manager', 'admin'),
  getAllExpenses
);

// 4. Approve an expense (manager, admin)
router.put(
  '/:id/approve',
  authMiddleware,
  requireRole('manager', 'admin'),
  approveExpense
);

// 5. Reject an expense (manager, admin)
router.put(
  '/:id/reject',
  authMiddleware,
  requireRole('manager', 'admin'),
  rejectExpense
);

// 6. Edit an expense (user, manager, admin - controller handles ownership validation)
router.put(
  '/:id',
  authMiddleware,
  requireRole('user', 'manager', 'admin'),
  updateExpense
);

// 7. Delete an expense (admin only)
router.delete(
  '/:id',
  authMiddleware,
  requireRole('admin'),
  deleteExpense
);

export default router;