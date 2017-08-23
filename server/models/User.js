const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10
const Schema = mongoose.Schema

const userSchema = Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'EDITOR', 'AUTHOR']
  },
  photo: String,
  displayName: String,
  firstName: String,
  lastName: String,
  website: String
}, {
  timestamps: true
})

//
// Hash password before saving
//
userSchema.pre('save', async function(next) {
  try {
    const user = this

    if (!user.isModified('password')) {
      return next()
    }

    const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR)
    user.password = hash

    return next()
  } catch(e) {
    return next(err)
  }
})

//
// Check login credentials
//
userSchema.statics.verifyCredentials = async function({ email, password }) {
  const user = await this.findOne({ email })
  const isPasswordValid = await bcrypt.compare(password, user.password)

  return isPasswordValid
}

module.exports = mongoose.model('User', userSchema)