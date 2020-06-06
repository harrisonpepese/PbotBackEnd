const CRUDService = require('../defaults/CRUDService')
const StateModel = require('../models/state')
const InputValidation = require('../utils/inputValidation')
class StateService extends CRUDService {
  constructor () {
    super(StateModel)
  }

  async load (id) {
    const { data, error } = await this.getOne(id)
    if (error) throw error
    this.state = data
  }

  getResponse (tryes) {
    let response = ''
    const { text, tryFailText, options } = this.state
    if (tryes !== 0 && tryFailText) {
      response += tryFailText
    } else {
      response += text
    }
    if (this.state.type === 'question') {
      if (options && options.length) {
        response = `${text}\n`
        options.forEach((element, index) => {
          response = response.concat(`${index + 1}) ${element.text}.\n`)
        })
      }
    }
    return response
  }

  async processState (message, tryes, data) {
    if (tryes === 0 && !this.state.type === 'info') {
      return {
        state: this.state._id,
        text: this.getResponse(tryes),
        data: null
      }
    }
    if (tryes >= this.state.maxTryes) return this.state.failState
    if (!InputValidation.validate(this.state.inputType, message.text)) {
      return {
        state: this.state._id,
        text: this.getResponse(tryes + 1),
        data: null
      }
    }
    let res = await this[this.state.type](message, tryes, data)
    if (this.state.type === 'info') {
      res = this.info(message, 0)
    }
    return res
  }

  async info (message, tryes, data) {
    let res = this.getResponse(tryes)
    await this.load(this.state.nextState)
    res += `\n${this.getResponse(0)}`
    return {
      state: this.state._id,
      text: res,
      data: null
    }
  }

  async question (message) {
    const optionIndex = await this.processOptions(message.intents, message.text)
    if (optionIndex < 0) return this.state._id
    await this.load(this.state.options[optionIndex].state)
    return {
      state: this.state._id,
      text: this.getResponse(0),
      data: null
    }
  }

  async processOptions (intents, text) {
    const { options } = this.state
    const num = Number.parseInt(text)
    if (num && num >= 0 && num <= options.length) {
      return num - 1
    }
    for (const index in options) {
      if (intents.filter(i => i.intent === options[index].validIntent).length ||
      options[index].validAnswers.includes(text.toLowerCase())) return index
    }
    return -1
  }

  async validation (message, tryes, data) {
    if (message.text.toLowerCase() === data[this.state.field]) {
      await this.load(this.state.nextState)
      return {
        state: this.state._id,
        text: this.getResponse(tryes),
        data: null
      }
    }
    return {
      state: this.state._id,
      text: this.getResponse(tryes + 1),
      data: null
    }
  }

  async input (message) {
    const data = { [this.state.field]: message.text }
    await this.load(this.state.nextState)
    return {
      state: this.state._id,
      text: this.getResponse(0),
      data
    }
  }
}

module.exports = StateService
