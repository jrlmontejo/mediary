const mongoose = require('mongoose')
const randtoken = require('rand-token')
const ms = require('ms')

const Schema = mongoose.Schema

const refreshTokenSchema = Schema({
  value: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  expiresOn: {
    type: Date,
    required: true
  }
})

refreshTokenSchema.pre('validate', function generateRefreshToken(next) {
  const token = this
  token.value = randtoken.uid(256)
  token.expiresOn = Date.now() + ms('1y')
  next()
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)