const mongoose = require('mongoose')

const { Schema } = mongoose

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense