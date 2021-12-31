const dotenv = require('dotenv').config({ path: '.env' })
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const expenseRoutes = require('./routes/expenses')
const userRoutes = require('./routes/users')
const errorHandler = require('./controllers/error')

const app = express()
connectDB()
const port = process.env.PORT || 3080

app.use(express.json())

app.use(cors())

app.use('/api/v1/expenses', expenseRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/', (req, res) => {
  res.send('App Works !!!!')
})

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})