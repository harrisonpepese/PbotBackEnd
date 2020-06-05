const { processIncoming, processMessage } = require('../services/converse')
class ConverseController {
  static async responseHandler (res, status, message) {
    return res.status(status).send(message)
  }

  static async incomingMessage (req, res, next) {
    const { text } = req.body
    if (!text || !req.flux) return ConverseController.responseHandler(res, 400, 'not content')
    const message = await processIncoming(text, req.flux)
    if (!message) return ConverseController.responseHandler(res, 400, 'not content')
    return ConverseController.responseHandler(res, 200, message)
  }

  static async processMessage (req, res, next) {
    const { text } = req.body
    const { chatId } = req.params
    if (!text || !chatId) return ConverseController.responseHandler(res, 400, 'not content')
    const message = await processMessage(text, chatId)
    if (!message) return ConverseController.responseHandler(res, 400, 'this session is closed')
    return ConverseController.responseHandler(res, 200, message)
  }
}

module.exports = ConverseController
