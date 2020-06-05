const MessageService = require('./message')
const ChatService = require('./chat')
const StateService = require('./state');
class ConverseService {
  static async processIncoming (text, flux) {
    const message = await MessageService.create(text, 'user')
    await MessageService.getMessaseIntent(message)
    const chatService = new ChatService()
    await chatService.create(flux)
    await chatService.pushMessage(message)
    const stateService = new StateService()
    await stateService.load(chatService.chat.state)
    const chat = await chatService.changeState(await stateService.processState(message), chatService.chat.tryes || 0)
    const response = stateService.getResponse()
    await chatService.pushMessage(await MessageService.create(response, 'bot'))
    return {
      chatId: chat._id,
      response
    }
  }

  static async processMessage (text, chatId) {
    const message = await MessageService.create(text, 'user')
    await MessageService.getMessaseIntent(message)
    const chatService = new ChatService()
    await chatService.load(chatId)
    await chatService.pushMessage(message)
    const stateService = new StateService()
    await stateService.load(chatService.chat.state)
    await chatService.changeState(await stateService.processState(message, chatService.chat.data, chatService.chat.tryes || 0))
    const response = stateService.getResponse()
    await chatService.pushMessage(await MessageService.create(response, 'bot'))
    return {
      response
    }
  }
}
module.exports = ConverseService
