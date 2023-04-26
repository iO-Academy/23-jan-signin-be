const jsonResponseService = require("../Services/jsonResponseService");

const checkJsonMiddleware = (req, res, next) => {
    if(req.headers['content-type'] != 'application/json') {
        return res.json(jsonResponseService('Error: Only JSON content is permitted', [], 400))
    } else {
        next()
    }
}

module.exports = checkJsonMiddleware