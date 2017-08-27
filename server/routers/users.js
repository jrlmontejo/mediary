const express = require('express')
const jwt = require('jsonwebtoken')

const error = require('../utils/error')
const jwtPayload = require('../utils/jwtPayload')
const User = require('../models/User')
const RefreshToken = require('../models/RefreshToken')
const router = express.Router()

//
// POST /users
// Add new user
// PRIVATE, IS_ADMIN
//
router.post('/', async (req, res) => {
  const userData = req.body

  const user = new User({
    email: userData.email,
    password: userData.password,
    role: userData.role,
    firstName: userData.firstName,
    lastName: userData.lastName,
    website: userData.website
  })

  try {
    await user.save(user)

    // TODO: Send email verification link

    res.status(204).send()
  } catch(err) {
    console.error(err)

    // email already used
    if (err.message.indexOf('duplicate key error') !== -1) {
      return res.status(409).json(error('USER_ALREADY_EXISTS'))
    }

    // validation errors
    if (err.hasOwnProperty('errors')) {
      return res.status(400).json(error('SAVE_FAILED', err.errors))
    }

    res.status(500).json(error())
  }
})

//
// GET /users
// Get all users
// PRIVATE
//
router.get('/', async (req, res) => {
  try {

  } catch(err) {
    console.error(err)

  }
})

//
// PUT /users/:userId
// Update a user
// PRIVATE
//
router.put('/:userId', async (req, res) => {
  try {
    const currentUser = req.decoded
    const userId = req.params.userId
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json(error('USER_NOT_FOUND'))
    }


  } catch(err) {
    console.error(err)
  }
})

//
// GET /users/:userId
// Get a user
// PRIVATE
//
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const user = await User.findOne({ _id: userId })

    if (!user) {
      return res.status(404).json(error('USER_NOT_FOUND'))
    }

    res.json({
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      website: user.website || '',
      role: user.role
    })
  } catch(err) {
    console.error(err)
    res.status(500).json(error())
  }
})

//
// POST /users/login
// Authenticate user via email/password and return access and refresh tokens
// PUBLIC
//
router.post('/login', async (req, res) => {
  try {
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

    const token = await jwt.sign(
      jwtPayload(user),
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    if (!token) {
      return res.status(500).json(error())
    }

    const refreshToken = new RefreshToken()
    refreshToken.email = user.email
    await refreshToken.save()

    res.json({ token, refreshToken: refreshToken.value })
  } catch(err) {
    console.error(err)

    // validation errors
    if (err.hasOwnProperty('errors')) {
      return res.status(400).json(error('SAVE_FAILED', err.errors))
    }

    res.status(500).json(error())
  }
})

router.post('/token', async (req, res) => {
  try {
    const email = req.body.email
    const value = req.body.refreshToken

    const refreshToken = await RefreshToken.findOne({ email, value })

    if (!refreshToken) {
      return res.status(400).json(error('INVALID_REFRESH_TOKEN'))
    }

    const user = await User.findByEmail(email)

    if (!user) {
      return res.status(404).json(error('USER_NOT_FOUND'))
    }

    const token = await jwt.sign(
      jwtPayload(user),
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    )

    if (!token) {
      return res.status(500).json(error())
    }

    res.json({ token })
  } catch(err) {
    console.error(err)
    res.status(500).json(error())
  }
})

module.exports = router