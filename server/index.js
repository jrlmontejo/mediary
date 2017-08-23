'use strict'

require('dotenv').config()
require('./config/db')
require('./config/promisify')

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

// include models
const User = require('./models/User')

// include routers
const userRouter = require('./routers/user')
const usersRouter = require('./routers/users')

// initialize API
const app = express()

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use('/user', userRouter)
app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'Mediary API is working!'
  })
})

// app.get('/users', (req, res) => {
//   const newUser = new User()
//   newUser.email = "JAYE2@WHITEwidget.com"
//   newUser.password = '123456'

//   newUser.save(err => {
//     if (err) {
//       res.json(err)
//     }

//     res.json({
//       user: newUser
//     })
//   })
// })

app.listen(3001, () => {
  console.log('Listening on 3001!')
})