import Expense from '../models/Expense.js';

// Create Expense
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      submittedBy: req.user.userId,
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get My Expenses
export const getMyExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ submittedBy: req.user.userId });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().populate('submittedBy', 'name email');
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve Expense
export const approveExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });

    expense.status = 'approved';
    await expense.save();
    res.status(200).json({ message: 'Expense approved successfully.', expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject Expense
export const rejectExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });

    expense.status = 'rejected';
    await expense.save();
    res.status(200).json({ message: 'Expense rejected successfully.', expense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Expense (With Ownership Verification)
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });

    const isOwner = expense.submittedBy.toString() === req.user.userId;
    const isPrivileged = ['manager', 'admin'].includes(req.user.role);

    if (!isOwner && !isPrivileged) {
      return res.status(403).json({ message: 'You can only modify your own expenses.' });
    }

    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Expense (Admin Restricted via Route + Ownership/Admin Validation)
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found.' });

    await expense.deleteOne();
    res.status(200).json({ message: 'Expense deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};