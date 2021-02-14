const express = require('express')

const auth = require('../middleware/auth')
const {
  createExpense, updateExpense, deleteExpense, getUsersExpenses, 
} = require('../controllers/expenses')


const router = express.Router()

router
  .route('/')
  .get(auth, getUsersExpenses)
  .post(auth, createExpense)

router
  .route('/:expenseId')
  .patch(auth, updateExpense)
  .delete(auth, deleteExpense)

router.route('/test').get((req, res) => res.status(200).json({ success: true }))

module.exports = router