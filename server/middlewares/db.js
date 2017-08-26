const mongoose = require('mongoose')
const error = require('../utils/error')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const name = process.env.DB_NAME

const uri = `mongodb://${user}:${password}@${host}:${port}/${name}`

//
// Establish connection with the database
//
module.exports = async (req, res, next) => {
  try {
    await mongoose.connect(uri, { useMongoClient: true })
    next()
  } catch(err) {
    console.error(err)
    return res.status(500).json(error('DB_CONNECTION_ERROR'))
  }
}