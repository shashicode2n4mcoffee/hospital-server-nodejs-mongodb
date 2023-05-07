const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const dotEnv = require('dotenv')

const app = express()

app.get('/home', (req, res) => {
  res.status(200).send({ messgae: 'Welcome to our first application' })
})

app.listen(8080, () => {
  console.log(`Server is up and running on the port : ${8080}`)
})
