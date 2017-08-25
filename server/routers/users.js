const express = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const router = express.Router()

//
// Get all users
// PRIVATE, IS_ADMIN
//
router.get('/', async (req, res) => {

})

//
// Get a single user
// PRIVATE, IS_ADMIN
//
router.get('/:userId', async (req, res) => {

})

module.exports = router