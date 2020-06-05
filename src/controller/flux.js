const CRUDController = require('../defaults/CRUDController')
const FluxService = require('../services/flux')
const autoBind = require('auto-bind')

class StateController extends CRUDController {
  constructor () {
    super(new FluxService(), 'flux')
    autoBind(this)
  }
}

module.exports = StateController
