const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const messageModel = new Schema({
  text: { type: String, required: true },
  isFrom: { type: String, enum: ['user', 'bot', 'system'], required: true },
  intents: [{
    intent: String,
    confidence: Number
  }]
})
mongoose.model('message', messageModel)
module.exports = model('message', messageModel, 'messages')
