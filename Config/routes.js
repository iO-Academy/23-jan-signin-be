const CheckInController = require("../Controllers/CheckInController.js")
const jsonResponseService = require("../Services/jsonResponseService");

const routes = (app) => {

    app.post('/signin',CheckInController.newSignIn)
    app.post('/verify',CheckInController.verifyAdminCode)
    app.all('*', (req, res) => {
        return res.json(jsonResponseService("Invalid route",[],404))
    })
}
module.exports = routes
