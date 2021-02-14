const dotenv = require('dotenv').config({ path: '.env' })
const express = require('express')
const connectDB = require('./config/db')
const expenseRoutes = require('./routes/expenses')
const userRoutes = require('./routes/users')

const app = express()
connectDB()
const port = process.env.PORT || 3080

app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/api/v1/expenses', expenseRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
  res.send('App Works !!!!')
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})