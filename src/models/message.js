const { Schema, model } = require('mongoose')

const messageModel = new Schema({
  text: { type: String },
  isFrom: { type: String, enum: ['user', 'bot', 'system'] },
  intents: [{
    intent: String,
    confidence: Number
  }]
})

module.exports = model('message', messageModel, 'messages')
