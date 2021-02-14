const Expense = require('../models/Expense')
const catchAsync = require('../config/catchAsync')

exports.createExpense = catchAsync(async (req, res) => {
  const {
    title, amount, description, 
  } = req.body
  
  const expense = { 
    title,
    amount, 
    description, 
    owner: req.user._id,
  }

  if (!description) { delete expense.description }

  const newExpense = new Expense(expense)
  await newExpense.save()
  res.status(201).json({ success: true, data: newExpense })
})

exports.updateExpense = catchAsync(async (req, res) => {
  const updates = { ...req.body }
  const updatedExpense = await Expense.findByIdAndUpdate(req.params.expenseId, updates, { new: true })
  res.status(200).json({ success: true, data: updatedExpense })
})