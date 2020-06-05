const { Router } = require('express')
const fluxMiddleware = require('../middleware/flux')
const { processMessage, incomingMessage } = require('../controller/converse')

class ConverseRoute {
  constructor () {
    this.router = Router()
    this.intantiate()
  }

  intantiate () {
    this.router.param('botName', fluxMiddleware)
    this.router.route('/:botName')
      .post(incomingMessage)
    this.router.route('/:botName/:chatId')
      .post(processMessage)
  }
}
module.exports = new ConverseRoute().router
