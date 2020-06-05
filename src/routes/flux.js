const { Router } = require('express')
const FluxController = require('../controller/flux')
class FluxRoutes {
  constructor () {
    this.router = Router()
    this.controller = new FluxController()
    this.intantiate()
  }

  intantiate () {
    this.router.param('id', this.controller.middleware)

    this.router.route('/')
      .get(this.controller.getAll)
      .post(this.controller.create)

    this.router.route('/:id')
      .get(this.controller.getOne)
      .put(this.controller.update)
      .delete(this.controller.remove)
  }
}

module.exports = new FluxRoutes().router
