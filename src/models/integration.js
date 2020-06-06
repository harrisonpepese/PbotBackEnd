const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const integrationModel = new Schema({
  URL: { type: String },
  Path: { type: String },
  method: { type: String }
})
mongoose.model('integration', integrationModel)
module.exports = model('integration', integrationModel, 'intregation')
