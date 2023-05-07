const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotEnv = require('dotenv')
const dbConnect = require('./config/db')

const { userRouter } = require('./routes')
const {
  globalErrorHandler,
} = require('./config/errorHandlers/globalErrorHandler')

// dotenv config
dotEnv.config()

const app = express()

//Connenction to the Database
dbConnect()

app.use(cookieParser())

// Routes
app.use('/api/v1/user', userRouter)

// Base test api
app.get('/home', (req, res) => {
  res.status(200).send({ messgae: 'Welcome to our first application' })
})

// Global error handling
app.use((error, req, res, next) => globalErrorHandler(error, req, res, next))

// App server listener
app.listen(8080, () => {
  console.log(`Server is up and running on the port : ${8080}`)
})
