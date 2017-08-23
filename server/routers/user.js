const express = require('express')
const jwt = require('jsonwebtoken')

const error = require('../utils/error')
const User = require('../models/User')
const router = express.Router()

//
// Register new user
// PUBLIC
//
router.post('/', async (req, res) => {})

//
// Get user data
// PRIVATE
//
router.get('/', async (req, res) => {
  res.send('Werking auth')
})

//
// Update user data
// PRIVATE
//
router.put('/', async (req, res) => {})

//
// Authenticate user and return an auth token
// PUBLIC
//
router.post('/token', async (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password
  }

  const user = await User.findByEmail(credentials.email)

  if (!user) {
    return res.status(404).json(error('USER_NOT_FOUND'))
  }

  const isPasswordValid = await user.verifyPassword(credentials.password)

  if (!isPasswordValid) {
    return res.status(400).json(error('INVALID_PASSWORD'))
  }

  const token = await jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' })

  if (!token) {
    return res.status(500).json(error())
  }

  res.status(200).json({ token })
})

//
// Send forgot password link
// PUBLIC
//
router.post('/email/forgot-password', async (req, res) => {})

//
// Update user password
// PRIVATE
//
router.put('/password', async (req, res) => {})

//
// Send email verification link
// PUBLIC
//
router.post('/email/verified', async (req, res) => {})

//
// Verify user email
// PUBLIC
//
router.put('/verified', async (req, res) => {})

module.exports = router