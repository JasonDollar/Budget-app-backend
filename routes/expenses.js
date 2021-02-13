const express = require('express')

const { createExpense, updateExpense } = require('../controllers/expenses')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ success: true })
  })
  .post(createExpense)

router
  .route('/:expenseId')
  .patch(updateExpense)


module.exports = router