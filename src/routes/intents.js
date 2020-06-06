const { Router } = require('express')
const IbmService = new (require('./ibm'))()

class IntentRoute {
  constructor () {
    this.router = Router()
  }

  instatiate () {
    this.router.route('/').get(
      async (req, res, next) => {
        res.status(200).send(await IbmService.getIntents)
      })
  }
}

module.exports = new IntentRoute().router
