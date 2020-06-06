class CRUDController {
  constructor (service, path) {
    this.service = service
    this.path = path
  }

  async reponseHandler (res, code, data) {
    return res.status(code).send(data)
  }

  async middleware (req, res, next) {
    const { id } = req.params
    if (!id) return this.reponseHandler(res, 400, { error: 'parametros inválidos' })
    const { data, error } = await this.service.getOne(id)
    if (error) return this.reponseHandler(res, 400, { error })
    req[this.path] = data
    return next()
  }

  async getAll (req, res, next) {
    const { data, error } = await this.service.getAll()
    if (error) return res.status(400).send({ error })
    return res.status(200).send(data)
  }

  async getOne (req, res, next) {
    if (req[this.path]) return res.status(200).send({ data: req[this.path] })
    return res.status(204).send({ error: 'não encontrado' })
  }

  async create (req, res, next) {
    const { body } = req
    if (!(body)) return res.status(400).send({ error: 'parametros inválidos' })
    const { data, error } = await this.service.create(body)
    if (error) return res.status(400).send({ error })
    return res.status(200).send(data)
  }

  async update (req, res, next) {
    if (!(req[this.path] || req.body)) return res.status(400).send({ error: 'parametros inválidos' })
    const { data, error } = await this.service.update(req[this.path], req.body)
    if (error) return res.status(400).send({ error })
    return res.status(200).send(data)
  }

  async remove (req, res, next) {
    if (!req[this.path]) return res.status(400).send({ error: 'parametros inválidos' })
    const { data, error } = await this.service.remove(req[this.path])
    if (error) return res.status(400).send({ error })
    return res.status(200).send(data)
  }
}

module.exports = CRUDController
