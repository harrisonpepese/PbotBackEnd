const { Schema, model } = require('mongoose')

const integrationModel = new Schema({
  URL: { type: String },
  Path: { type: String },
  method: { type: String }
})

module.exports = model('integration', integrationModel, 'intregation')
