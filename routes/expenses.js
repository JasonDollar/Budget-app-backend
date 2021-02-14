const express = require('express')

const auth = require('../middleware/auth')
const { createExpense, updateExpense } = require('../controllers/expenses')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ success: true })
  })
  .post(auth, createExpense)

router
  .route('/:expenseId')
  .patch(updateExpense)


module.exports = router