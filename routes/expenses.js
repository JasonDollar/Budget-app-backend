const express = require('express')

const { createExpense } = require('../controllers/expenses')

const router = express.Router()

router
  .route('/')
  .get((req, res) => {
    res.json({ success: true })
  })
  .post(createExpense)



module.exports = router