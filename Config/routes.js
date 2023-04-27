const CheckInController = require("../Controllers/CheckInController.js")
const jsonResponseService = require("../Services/jsonResponseService");
const checkJsonMiddleware = require('../Middleware/checkJsonMiddleware')

const routes = (app) => {

    app.post('/signin',checkJsonMiddleware,CheckInController.newSignIn)
    app.post('/verify',checkJsonMiddleware,CheckInController.verifyAdminCode)
    app.get('/activeSignIns',CheckInController.activeSignIns)
    app.get('/search',checkJsonMiddleware,CheckInController.getByName)
    app.all('*', (req, res) => {
        return res.json(jsonResponseService("Invalid route",[],404))
    })
}
module.exports = routes
