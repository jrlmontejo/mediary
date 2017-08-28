const Promise = require('bluebird')
Promise.promisifyAll(require('fs'))
Promise.promisifyAll(require('bcrypt'))

const mongoose = require('mongoose')
mongoose.Promise = Promise