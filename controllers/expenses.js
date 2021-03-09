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
  res.status(201).json({ success: true, expense: newExpense })
})

exports.updateExpense = catchAsync(async (req, res) => {
  const updates = { ...req.body }
  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: req.params.expenseId, owner: req.user._id }, 
    updates, 
    { new: true, useFindAndModify: false },
  )
  res.status(200).json({ success: true, expense: updatedExpense })
})

exports.deleteExpense = catchAsync(async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.expenseId, owner: req.user._id })
  if (!expense) {
    return res.status(404).json({ success: false, message: 'Did not find such expense' })
  }

  res.status(200).json({ success: true, expense })
})

exports.getUsersExpenses = catchAsync(async (req, res) => {
  const expenses = await Expense.find({ owner: req.user._id })

  res.status(200).json({ success: true, expenses })
})