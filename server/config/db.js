const mongoose = require('mongoose')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const host = process.env.DB_HOST
const port = process.env.DB_PORT
const name = process.env.DB_NAME

const uri = `mongodb://${user}:${password}@${host}:${port}/${name}`
mongoose.connect(uri, { useMongoClient: true })

const db = mongoose.connection
db.on('error', err => console.log(err))