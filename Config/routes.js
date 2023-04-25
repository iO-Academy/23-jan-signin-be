const CheckInController = require("../Controllers/CheckInController.js")
const routes = (app) => {

    app.get('/', (req, res) => {res.send('Hello World!')})
    app.post('/',CheckInController.newSignIn)
}
module.exports = routes
