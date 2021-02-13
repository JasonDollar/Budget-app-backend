const mongoose = require('mongoose')

const { Schema } = mongoose

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 180,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date(),
  },
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense