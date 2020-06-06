const Service = new (require('../services/state'))()
module.exports = async function (req, res, next) {
  const { idState } = req.params
  if (!idState) return res.status(400).send('no content')
  const { data, error } = await Service.getOne(idState)
  if (error) return res.status(400).send(error)
  req.state = data
  next()
}
