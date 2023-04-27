
const convertToHourMinuteString = (unixTimestamp) => {
    if (typeof(unixTimestamp) !=="number")
    {
        throw new TypeError();
    }
    let date = new Date(unixTimestamp)
    return date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes()
}

exports.convertToHourMinuteString = convertToHourMinuteString