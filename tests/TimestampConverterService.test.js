// noinspection JSUnresolvedReference

const timestampConverterServiceTest = require ("../Services/TimestampConverterService")

describe('Timestamp Converter Service Success Tests', () => {

    test('Converting Unix timestamp to Hour-Minute string correctly', () => {
        expect(timestampConverterServiceTest.convertToHourMinuteString(1682433952415)).toBe("15:45")
    })
})