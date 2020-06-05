const { Schema, model } = require('mongoose')

const fluxModel = new Schema({
  name: { type: String },
  initialState: { type: Schema.Types.ObjectId, ref: 'states' },
  states: [{ type: Schema.Types.ObjectId, ref: 'states' }]
})

module.exports = model('flux', fluxModel, 'fluxes')
