const fluxService = new (require('../services/flux'))()
module.exports = async function (req, res, next) {
  const { botName } = req.params
  if (!botName) return res.status(400).send('no content')
  const { data, error } = await fluxService.getByName(botName)
  if (error) return res.status(400).send(error)
  req.flux = data
  next()
}
