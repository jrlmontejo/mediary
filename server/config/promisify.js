const Promise = require('bluebird')
Promise.promisifyAll(require('bcrypt'))

const mongoose = require('mongoose')
mongoose.Promise = Promise