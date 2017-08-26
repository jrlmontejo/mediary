const jwt = require('jsonwebtoken')
const unless = require('express-unless')
const error = require('../utils/error')

//
// Require authentication on some routes
//
const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization')

  if (!authHeader) {
    return res.status(403).json(error('AUTH_REQUIRED'))
  }

  if (!authHeader.startsWith('Bearer ')) {
    return res.status(403).json(error('INVALID_AUTH_TYPE'))
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)

    if (!decoded) {
      return res.status(500).json(error())
    }

    req.decoded = decoded
    next()
  } catch(err) {
    console.error(err)

    if(err.name === 'TokenExpiredError') {
      return res.status(403).json(error('AUTH_TOKEN_EXPIRED'))
    }

    res.status(403).json(error('INVALID_AUTH_TOKEN'))
  }
}

auth.unless = unless
module.exports = auth