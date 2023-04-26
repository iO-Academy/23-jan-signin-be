const express = require('express')
const cors = require('cors')
const routes = require('./Config/routes')
const checkJsonMiddleware = require('./Middleware/checkJsonMiddleware')

const app = express()

app.use(express.json())
app.use(checkJsonMiddleware)
app.use(cors())

routes(app)

module.exports = app
