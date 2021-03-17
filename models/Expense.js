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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  expenseDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
}, {
  timestamps: true,
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense