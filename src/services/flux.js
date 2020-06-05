const CRUDService = require('../defaults/CRUDService')
const FluxModel = require('../models/fluxo')
const { PromiseHandler } = require('../utils/promisseHandler')
class FluxService extends CRUDService {
  constructor () {
    super(FluxModel)
  }

  async getByName (name) {
    return PromiseHandler(this.model.findOne({ name }))
  }
}

module.exports = FluxService
