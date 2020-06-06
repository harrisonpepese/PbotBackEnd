const CRUDService = require('../defaults/CRUDService')
const ChatModel = require('../models/chat')

class ChatService extends CRUDService {
  constructor (id) {
    super(ChatModel)
    if (id) {
      this.chat = this.getOne(id)
    }
  }

  async load (id) {
    const { data, error } = await this.getOne(id)
    if (error) throw error
    this.chat = data
  }

  async create (flux) {
    this.chat = await ChatModel.create({ flux, state: flux.initialState })
  }

  async pushMessage (message) {
    this.chat.messages.push(message)
    return await this.chat.save()
  }

  async changeState (state) {
    if (state.equals(this.chat.state)) {
      this.chat.tryes++
    } else {
      this.chat.state = state
      this.chat.tryes = 0
    }
    return await this.chat.save()
  }

  async updateData (object) {
    Object.assign(this.chat.data, object)
    this.chat.markModified('data')
    return await this.chat.save()
  }

  async closeChat () {
    this.chat.isClosed = true
    return await this.chat.save()
  }
}

module.exports = ChatService
