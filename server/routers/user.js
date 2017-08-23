const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

router.post('/token', async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  }

  const isUserValid = await User.verifyCredentials(credentials)

  res.json({ message: isUserValid })
})

module.exports = router