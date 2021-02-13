const express = require('express')
const expenseRoutes = require('./routes/expenses')

const app = express()

const port = process.env.PORT || 3080

app.use(express.json())

app.use('/api/v1/expenses', expenseRoutes)

app.get('/', (req, res) => {
  res.send('App Works !!!!')
})

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`)
})