const jsonResponseService = (msg, data, statusCode ) => {
    if (typeof msg === 'string' && Array.isArray(data) && typeof statusCode === 'number') {
        return {
            msg,
            data,
            status: statusCode
        }
    }
    else {
        return {
            msg: 'Bad request',
            data: [],
            status: 400
        }
    }
}

module.exports = jsonResponseService
