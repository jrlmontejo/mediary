const mongoose = require('mongoose')

const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
mongoose.connect(uri, { useMongoClient: true })

const db = mongoose.connection
db.on('error', err => console.log(err))