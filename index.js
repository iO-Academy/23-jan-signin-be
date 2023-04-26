const express = require('express')
const routes = require('./Config/routes')
const checkJsonMiddleware = require('./Middleware/checkJsonMiddleware')

const app = express()

app.use(express.json())
app.use(checkJsonMiddleware)

routes(app)

module.exports = app
