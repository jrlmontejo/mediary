const mongoose = require('mongoose')
const randtoken = require('rand-token')

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
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '1m'
  }
})

refreshTokenSchema.pre('validate', function generateRefreshToken(next) {
  const token = this
  token.value = randtoken.uid(256)
  next()
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)