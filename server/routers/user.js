const express = require('express')
const jwt = require('jsonwebtoken')

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
router.get('/', async (req, res) => {})

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

  const isUserValid = await User.verifyCredentials(credentials)

  res.json({ message: isUserValid })
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