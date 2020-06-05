const { Schema, model } = require('mongoose')

const chatModel = new Schema({
  flux: { type: Schema.Types.ObjectId, ref: 'fluxes' },
  data: { type: Schema.Types.Mixed },
  messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
  state: { type: Schema.Types.ObjectId, ref: 'states' },
  tryes: { type: Number, default: 0 }
})

module.exports = model('chat', chatModel, 'chats')
