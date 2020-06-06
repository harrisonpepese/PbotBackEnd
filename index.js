const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const converseRoute = require('./src/routes/converse')
const stateRoute = require('./src/routes/state')
const fluxRoute = require('./src/routes/flux')
const intentRoute = require('./src/routes/intents')
const fs = require('fs')
class App {
  constructor () {
    this.app = express()
    this.config()
    this.routes()
    this.db()
  }

  config () {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(bodyParser.json())
    this.app.use(cors())
    fs.readdirSync('./src/models').forEach(file => require(`./src/models/${file}`))
  }

  routes () {
    this.app.use('/converse', converseRoute)
    this.app.use('/state', stateRoute)
    this.app.use('/flux', fluxRoute)
    this.app.use('/intent', intentRoute)
  }

  db () {
    mongoose.connect(
      'mongodb+srv://harrisonpepese:muxuxa22@hpv0-vghvf.mongodb.net/Pbot?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        const port = process.env.PORT || 3001
        this.app.listen(port, () => {
          console.log('is online ' + port)
        })
      })
  }
}

module.exports = new App()
