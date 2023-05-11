const mongoose = require('mongoose')

const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.info('Mongodb is connect and running')
  } catch (error) {
    console.error('Mongodb connection failed', process.env.MONGO_URI, error)
  }
}

module.exports = dbConnect
