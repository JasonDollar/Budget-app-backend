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
  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: req.params.expenseId, owner: req.user._id }, 
    updates, 
    { new: true },
  )
  res.status(200).json({ success: true, data: updatedExpense })
})

exports.deleteExpense = catchAsync(async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.expenseId, owner: req.user._id })
  if (!expense) {
    return res.status(404).json({ success: false, message: 'Did not find such expense' })
  }

  res.status(200).json({ success: true, data: expense })
})