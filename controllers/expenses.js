const Expense = require('../models/Expense')
const catchAsync = require('../config/catchAsync')

exports.createExpense = catchAsync(async (req, res) => {
  const {
    title, amount, description, category,
  } = req.body

  const correctCategory = req.user.categories.find(item => item.categoryName === category)

  if (!correctCategory) {
    return res.status(404).json({ success: false, message: 'Chosen category is incorrect' })
  }
  
  const expense = { 
    title,
    amount, 
    description, 
    category,
    owner: req.user._id,
  }

  if (!description) { delete expense.description }

  const newExpense = new Expense(expense)
  await newExpense.save()
  return res.status(201).json({ success: true, expense: newExpense })
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

  return res.status(200).json({ success: true, expense })
})

exports.getUsersExpenses = catchAsync(async (req, res) => {
  const expenses = await Expense.find({ owner: req.user._id })

  return res.status(200).json({ success: true, expenses })
})

exports.getUserExpensesGrouped = catchAsync(async (req, res) => {
  const expenses = await Expense
    .aggregate([
      {
        $match: {
          owner: req.user._id,
        },
      },
      {
        $group: {
          // _id: null,
          _id: {
            // $first: {
            $concat: [
              { $toString: { $year: '$expenseDate' } },
              { $toString: { $cond: { if: { $lt: [{ $month: '$expenseDate' }, 10] }, then: '0', else: '' } } }, // Add zero in front of one digit month
              { $toString: { $month: '$expenseDate' } },
            ],
            // }, 
          }, 
          expenses: { $push: '$$ROOT' },
            
          totalExpensesQty: { $sum: '$amount' },
  
          totalExpensesCount: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ])
  
  return res.status(200).json({ success: true, expenses })
})
