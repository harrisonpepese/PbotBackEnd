const { PromiseHandler } = require('../utils/promisseHandler')
class CRUDService {
  constructor (model) {
    this.model = model
  }

  async getAll () {
    return PromiseHandler(this.model.find())
  }

  async getOne (id) {
    return PromiseHandler(this.model.findById(id))
  }

  async create (document) {
    return PromiseHandler(this.model.create(document))
  }

  async update (document, update) {
    Object.assign(document, update)
    return PromiseHandler(document.save())
  }

  async remove (document) {
    return PromiseHandler(document.remove())
  }
}

module.exports = CRUDService
