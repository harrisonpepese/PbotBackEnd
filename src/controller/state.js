const CRUDController = require('../defaults/CRUDController')
const StateService = require('../services/state')
const autoBind = require('auto-bind')

class StateController extends CRUDController {
  constructor () {
    super(new StateService(), 'state')
    autoBind(this)
  }
}

module.exports = StateController
