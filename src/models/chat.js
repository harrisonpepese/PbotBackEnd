const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const chatModel = new Schema({
  flux: { type: Schema.Types.ObjectId, ref: 'fluxes', required: true },
  data: { type: Schema.Types.Mixed, default: {} },
  messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
  state: { type: Schema.Types.ObjectId, ref: 'states' },
  tryes: { type: Number, default: 0 },
  isClosed: { type: Boolean, default: false }
})
mongoose.model('chat', chatModel)
module.exports = model('chat', chatModel, 'chats')
