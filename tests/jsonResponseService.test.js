// noinspection JSUnresolvedReference

const jsonResponseService = require('../Services/jsonResponseService.js')

describe('json response success tests', () => {
    test('default output', () => {
        expect(jsonResponseService()).toStrictEqual({
            "msg": 'Bad request',
            "data": [],
            "status": 400
        })
    })
    test('Successful Record retrieved', () => {
        expect(jsonResponseService('Record retrieved',[{'fee':100}],200)).toStrictEqual({
            "msg": 'Record retrieved',
            "data": [{'fee':100}],
            "status": 200
        })
    })
})

describe('json response failure tests', () => {
    test('Bad msg type', () => {
        expect(jsonResponseService(53, [{fee:500}], 200)).toStrictEqual({
            "msg": 'Bad request',
            "data": [],
            "status": 400
        })
    })
    test('Bad data type', () => {
        expect(jsonResponseService('Record retrieved', 'error', 200)).toStrictEqual({
            "msg": 'Bad request',
            "data": [],
            "status": 400
        })
    })
    test('Bad status code type', () => {
        expect(jsonResponseService('Record retrieved', [{fee:500}], "error")).toStrictEqual({
            "msg": 'Bad request',
            "data": [],
            "status": 400
        })
    })
})
