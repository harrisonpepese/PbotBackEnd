const CRUDService = require('../defaults/CRUDService')
const StateModel = require('../models/state')

class StateService extends CRUDService {
  constructor () {
    super(StateModel)
  }

  async load (id) {
    const { data, error } = await this.getOne(id)
    if (error) throw error
    this.state = data
  }

  getResponse () {
    const { text, options } = this.state
    if (options && options.length) {
      let response = `${text}\n`
      options.forEach((element, index) => {
        response = response.concat(`${index + 1}) ${element.text}.\n`)
      })
      return response
    }
    return text
  }

  async processState (message, fields, tryes) {
    if (tryes === 0) return this.state._id
    if (tryes > this.state.maxTryes) return this.state.failState
    const nextState = this[this.state.type](message, fields, tryes)
    return nextState
  }

  async info () {
    return this.state.nextState
  }

  async question (message) {
    const optionIndex = await this.processOptions(message.intents, message.text)
    if (optionIndex < 0) return this.state._id
    await this.load(this.state.options[optionIndex].state)
    return this.state._id
  }

  async processOptions (intents, text) {
    const { options } = this.state
    for (const index in options) {
      if (intents.filter(i => i.intent === options[index].validIntent).length ||
      options[index].validAnswers.includes(text.toLowerCase())) return index
    }
    return -1
  }

  async validation (message, fields) {

  }

  async input (message, field) {
    return {
      data: {
        [field]: message.text
      }
    }
  }

}

module.exports = StateService
