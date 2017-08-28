'use strict'

require('dotenv').config()
require('./config/promisify')

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')

const cors = require('./middlewares/cors')
const db = require('./middlewares/db')
const auth = require('./middlewares/auth')

// include models
const User = require('./models/User')

// include routers
const usersRouter = require('./routers/users')
const collectionsRouter = require('./routers/collections')
const publicRoutes = require('./config/publicRoutes')

// initialize API
const app = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors)
app.use(db)
app.use(auth.unless({ path: publicRoutes }))

app.use('/users', usersRouter)
app.use('/collections', collectionsRouter)

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