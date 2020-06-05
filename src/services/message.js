const model = require('../models/message')
const IbmService = new (require('./ibm'))()

class MessageService {
  static async create (text, isFrom) {
    return await model.create({ text, isFrom })
  }

  static async getMessaseIntent (message) {
    const { intents } = await IbmService.processMessage(message.text)
    message.intents.push(...intents)
    return message.save()
  }
}

module.exports = MessageService
