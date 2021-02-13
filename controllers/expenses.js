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