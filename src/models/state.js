const { Schema, model } = require('mongoose')
const mongoose = require('mongoose')

const state = new Schema({
  name: { type: String, required: true },
  flux: { type: Schema.Types.ObjectId, required: true },
  type: { type: String, enum: ['info', 'question', 'validation', 'input'], required: true },
  text: { type: String, required: true },
  inputType: { type: String, enum: ['any', 'text', 'number', 'email', 'phone'], default: 'any' },
  tryFailText: { type: String },
  intent: { type: String },
  options: [{
    text: { type: String },
    validAnswers: [{ type: String }],
    validIntent: { type: String },
    state: { type: Schema.Types.ObjectId, ref: 'states' }
  }],
  field: { type: String },
  maxTryes: { type: Number, default: 1 },
  nextState: { type: Schema.Types.ObjectId, ref: 'states' },
  erroState: { type: Schema.Types.ObjectId, ref: 'states' }
})

mongoose.model('state', state)
module.exports = model('state', state, 'states')
