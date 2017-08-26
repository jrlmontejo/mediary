const mongoose = require('mongoose')
const ms = require('ms')

const Schema = mongoose.Schema

const refreshTokenSchema = Schema({
  _id: String,
  userId: {
    type: String,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
})

refreshTokenSchema.pre('save', async function setTokenExpiry(next) {
  const token = this
  token.expiry = Date.now() + ms('1y')

  next()
})

module.exports = mongoose.model('RefreshToken', refreshTokenSchema)