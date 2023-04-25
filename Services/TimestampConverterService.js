
const convertToHourMinuteString = (unixTimestamp) => {
    if (typeof(unixTimestamp) !=="number")
    {
        throw new TypeError();
    }
    let date = new Date(unixTimestamp)
    return date.getHours() + ":" + date.getMinutes()
}

exports.convertToHourMinuteString = convertToHourMinuteString