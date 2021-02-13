const Expense = require('../models/Expense')

exports.createExpense = async (req, res) => {
  const {
    title, amount, description, createdAt = new Date(), 
  } = req.body
  const expense = { 
    title, amount, description, createdAt, 
  }

  if (!description) { delete expense.description }

  const newExpense = new Expense(expense)
  await newExpense.save()
  res.json({ success: true, data: newExpense })
}

exports.updateExpense = async (req, res) => {
  const updates = { ...req.body }
  const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseId, updates, { new: true })
  res.json({ success: true, data: updatedExpense })
}