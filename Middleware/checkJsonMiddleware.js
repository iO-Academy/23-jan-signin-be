const jsonResponseService = require("../Services/jsonResponseService");

const checkJsonMiddleware = (req, res, next) => {
    if(req.headers['content-type'] != 'application/json') {
        return res.json(jsonResponseService('Error: Only JSON content is permitted', [], 400))
    }
    if(Object.keys(req.body).length === 0) {
        return res.json(jsonResponseService("Error: Request cannot be empty",[],500))
    }

    next()

}

module.exports = checkJsonMiddleware