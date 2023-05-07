const express = require('express')
const { fetchUsers } = require('../controllers')

const userRouter = express.Router()

userRouter.get('', fetchUsers)

module.exports = userRouter
