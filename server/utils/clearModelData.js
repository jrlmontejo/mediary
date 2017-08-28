const mongoose = require('mongoose')

module.exports = modelName => {
  delete mongoose.models[modelName]
  delete mongoose.connection.models[modelName]
  delete mongoose.modelSchemas[modelName]
}