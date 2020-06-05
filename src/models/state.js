const { Schema, model } = require('mongoose')

const state = new Schema({
  name: { type: String },
  type: { type: String, enum: ['info', 'question', 'validation', 'input'] },
  options: [{
    text: { type: String },
    validAnswers: [{ type: String }],
    validIntent: { type: String },
    state: { type: Schema.Types.ObjectId, ref: 'states' }
  }],
  intents: [{ type: String }],
  validationField: { type: String },
  inputType: { type: String, enum: ['text', 'number', 'email', 'phone'] },
  text: { type: String },
  tryFailText: { type: String },
  maxTryes: { type: Number, default: 1 },
  nextState: { type: Schema.Types.ObjectId, ref: 'states' },
  erroState: { type: Schema.Types.ObjectId, ref: 'states' }
})

module.exports = model('state', state, 'states')
