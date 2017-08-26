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
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  photo: String,
  displayName: String,
  website: String
}, {
  timestamps: true
})

//
// Hash password before saving
//
userSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this

    if (!user.isModified('password')) {
      return next()
    }

    const hash = await bcrypt.hash(user.password, SALT_WORK_FACTOR)
    user.password = hash

    next()
  } catch(err) {
    next(err)
  }
})

//
// Find user by email
//
userSchema.statics.findByEmail = async function(email) {
  try {
    const user = await this.findOne({ email })
    return user || null
  } catch(err) {
    console.error(err)
    return null
  }
}

//
// Verify password
//
userSchema.methods.verifyPassword = async function(password) {
  try {
    const user = this
    const isPasswordValid = await bcrypt.compare(password, user.password)
    return isPasswordValid
  } catch(err) {
    console.error(err)
    return null
  }
}

module.exports = mongoose.model('User', userSchema)