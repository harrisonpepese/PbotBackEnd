const { Router } = require('express')
const FluxController = require('../controller/flux')
const StateMiddleware = require('../middleware/state')
class FluxRoutes {
  constructor () {
    this.router = Router()
    this.controller = new FluxController()
    this.intantiate()
  }

  intantiate () {
    this.router.param('id', this.controller.middleware)
    this.router.param('idState', StateMiddleware)

    this.router.route('/')
      .get(this.controller.getAll)
      .post(this.controller.create)

    this.router.route('/:id')
      .get(this.controller.getOne)
      .put(this.controller.update)
      .delete(this.controller.remove)

    this.router.route('/:id/state')
      .post(this.controller.createState)

    this.router.route('/:id/state/:idState')
      .put(this.controller.updateState)
      .delete(this.controller.removeState)
  }
}

module.exports = new FluxRoutes().router
