
const convertToHourMinuteString = (unixTimestamp) => {
    let date = new Date(unixTimestamp)
    return date.getHours() + ":" + date.getMinutes()
}

exports.convertToHourMinuteString = convertToHourMinuteString