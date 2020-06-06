const MessageService = require('./message')
const ChatService = require('./chat')
const FluxService = require('./flux')
class ConverseService {
  static async processIncoming (flux) {
    const chatService = new ChatService()
    await chatService.create(flux)
    const chat = await chatService.pushMessage(await MessageService.create(flux.initialText, 'bot'))
    return chat.populate({ path: 'messages', model: 'message' }).execPopulate()
  }

  static async processMessage (flux, text, chatId) {
    const message = await MessageService.create(text, 'user')
    await MessageService.getMessaseIntent(message)
    const fluxService = new FluxService(flux)
    const chat = await fluxService.processFlux(chatId, message)
    return chat.populate({ path: 'messages', model: 'message' }).execPopulate()
  }
}
module.exports = ConverseService
