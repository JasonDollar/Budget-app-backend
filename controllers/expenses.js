const Expense = require('../models/Expense')

exports.createExpense = async (req, res) => {
  const { title, amount } = req.body
  const newExpense = new Expense({ title, amount })
  await newExpense.save()
  res.json({ expense: newExpense })
}