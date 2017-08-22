const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const router = express.Router()

router.post('/token', async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  }

  const checkLogin = await User.verifyCredentials(credentials)

  res.json({ message: checkLogin })
})

module.exports = router