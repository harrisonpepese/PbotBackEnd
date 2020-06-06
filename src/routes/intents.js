const { Router } = require('express')
const IbmService = new (require('../services/ibm'))()

class IntentRoute {
  constructor () {
    this.router = Router()
    this.instatiate()
  }

  instatiate () {
    this.router.route('/').get(
      async (req, res, next) => {
        const resp = await IbmService.getIntents()
        res.status(200).send(resp.intents)
      })
  }
}

module.exports = new IntentRoute().router
