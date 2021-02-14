const express = require('express')

const auth = require('../middleware/auth')
const { createExpense, updateExpense, deleteExpense } = require('../controllers/expenses')


const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ success: true })
  })
  .post(auth, createExpense)

router
  .route('/:expenseId')
  .patch(auth, updateExpense)
  .delete(auth, deleteExpense)


module.exports = router