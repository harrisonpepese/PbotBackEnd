const CRUDController = require('../defaults/CRUDController')
const FluxService = require('../services/flux')
const autoBind = require('auto-bind')
const StateService = require('../services/state')

class StateController extends CRUDController {
  constructor () {
    super(new FluxService(), 'flux')
    this.StateService = new StateService()
    autoBind(this)
  }

  async getOne (req, res, next) {
    if (req[this.path]) {
      await req[this.path].populate({ path: 'states', model: 'state' }).execPopulate()
      return res.status(200).send(req[this.path])
    }
    return res.status(400).send({ error: 'não encontrado' })
  }

  async createState (req, res, next) {
    const { body, flux } = req
    if (!(body)) return res.status(400).send({ error: 'parametros inválidos' })
    body.flux = flux._id
    const { data, error } = await this.StateService.create(body)
    if (error) return res.status(400).send({ error })
    flux.states.push(data)
    flux.save()
    return res.status(200).send(data)
  }

  async updateState (req, res, next) {
    if (!(req.state || req.body)) return res.status(400).send({ error: 'parametros inválidos' })
    const { data, error } = await this.StateService.update(req.state, req.body)
    if (error) return res.status(400).send({ error })
    return res.status(200).send(data)
  }

  async removeState (req, res, next) {
    const { state, flux } = req
    if (!state) return res.status(400).send({ error: 'parametros inválidos' })
    const { data, error } = await this.StateService.remove(state)
    if (error) return res.status(400).send({ error })
    flux.states.pull(data._id)
    flux.save()
    return res.status(200).send(data)
  }
}

module.exports = StateController
