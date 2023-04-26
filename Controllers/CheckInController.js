const DbService = require("../Services/DbService");
const CheckInService = require("../Services/CheckInService");
const jsonResponseService = require("../Services/jsonResponseService");
const TimeStampConverterService = require ("../Services/TimestampConverterService")

const newSignIn = async (req,res)=> {
    if(Object.keys(req.body).length === 0) {
        return res.json(jsonResponseService("Error: Request cannot be empty",[],500))
    }

    if(!("name" in req.body)||(req.body.name===null)){
        return res.json(jsonResponseService("Error: Name cannot be null",[],400))
    }

    let name = req.body.name
    let company = req.body.company
    let checkInTime = Date.now()

    const collection = await DbService('OfficeGuestBook','GuestBook')
    const data = await CheckInService.newCheckIn(collection,name,company,checkInTime)
    if(data.insertedId !== null) {
        return res.json(jsonResponseService("Checked in successfully",[
            {"name":name,"company":company,"checkInTime":TimeStampConverterService.convertToHourMinuteString(checkInTime)}
        ],200))
    } else {
        return res.json(jsonResponseService("Error: Check in failed",[],400))
    }
}

exports.newSignIn = newSignIn