/* eslint-disable no-invalid-regexp */
/* eslint-disable no-throw-literal */
const CRUDService = require('../defaults/CRUDService')
const FluxModel = require('../models/fluxo')
const ChatService = require('./chat')
const StateService = require('./state')
const MessageService = require('./message')
const { PromiseHandler } = require('../utils/promisseHandler')
class FluxService extends CRUDService {
  constructor (flux) {
    super(FluxModel)
    this.flux = flux
  }

  async load (id) {
    this.flux = await this.model.findById(id)
  }

  async getByName (name) {
    return PromiseHandler(this.model.findOne({ name }))
  }

  async processFlux (chatId, message) {
    const stateService = new StateService()
    const chatService = new ChatService()
    await chatService.load(chatId)
    await chatService.pushMessage(message)
    try {
      if (!this.flux.states.includes(chatService.chat.state)) {
        throw 'Estado não pertence ao fluxo'
      }
      await stateService.load(chatService.chat.state)
      const { state, text, data } = await stateService.processState(message, chatService.chat.tryes, chatService.chat.data)
      if (!state) {
        throw 'finalizar'
      }
      if (data) {
        await chatService.updateData(data)
      }
      await chatService.changeState(state)
      return await chatService.pushMessage(
        await MessageService.create(
          await this.integrarTexto(chatService.chat.data, text),
          'bot')
      )
    } catch (error) {
      await chatService.pushMessage(await MessageService.create(this.flux.endText, 'bot'))
      return chatService.closeChat()
    }
  }

  async integrarTexto (chatData, text) {
    if (chatData) {
      const regEx = new RegExp('{([^}}]+)}')
      const matches = regEx.exec(text)
      if (matches) {
        matches.forEach(m => {
          text = text.replace(m, chatData[m.replace('{', '').replace('}', '')])
        })
      }
    }
    return text
  }
}

module.exports = FluxService
