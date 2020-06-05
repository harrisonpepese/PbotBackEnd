const { Router } = require('express')
const StateController = require('../controller/state')
class StateRoutes {
  constructor () {
    this.router = Router()
    this.controller = new StateController()
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

module.exports = new StateRoutes().router
