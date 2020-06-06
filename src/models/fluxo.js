const mongoose = require('mongoose')
const { Schema, model } = require('mongoose')

const fluxModel = new Schema({
  name: { type: String, required: true },
  initialText: { type: String, required: true },
  endText: { type: String, required: true },
  initialState: { type: Schema.Types.ObjectId, ref: 'states' },
  states: [{ type: Schema.Types.ObjectId, ref: 'states' }]
})
mongoose.model('flux', fluxModel)
module.exports = model('flux', fluxModel, 'fluxes')
