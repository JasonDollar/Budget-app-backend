const mongoose = require('mongoose')

const connectDB = async () => {
  const connection = await mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    // useUnifiedTopology: true,
    
  })

  console.log(`Mongo connected: ${connection.connection.host}`)
}

module.exports = connectDB