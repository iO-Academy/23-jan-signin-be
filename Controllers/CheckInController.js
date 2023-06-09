const DbService = require("../Services/DbService");
const jsonResponseService = require("../Services/jsonResponseService");
const TimeStampConverterService = require ("../Services/TimestampConverterService")
const {ObjectId} = require("mongodb");

const newSignIn = async (req,res)=> {

    if(!("name" in req.body)||(req.body.name===null)||(req.body.name==="")){
        return res.json(jsonResponseService("Error: Name cannot be null/empty",[],400))
    }

    let name = req.body.name
    let company = req.body.company
    let checkInTime = Date.now()

    const collection = await DbService('OfficeGuestBook','GuestBook')
    const data = await collection.insertOne({name,company,checkInTime})
    if(data.insertedId !== null) {
        return res.json(jsonResponseService("Checked in successfully",[
            {"name":name,"company":company,"checkInTime":TimeStampConverterService.convertToHourMinuteString(checkInTime)}
        ],200))
    } else {
        return res.json(jsonResponseService("Error: Check in failed",[],400))
    }
}

const verifyAdminCode = async (req,res)=> {

    if(!("code" in req.body)||(req.body.code===null)){
        return res.json(jsonResponseService("Error: Code cannot be null",[],400))
    }
    if(typeof req.body.code != "number"){
        return res.json(jsonResponseService("Error: Code must be numeric",[],400))
    }
    if(req.body.code.toString().length !== 4){
        return res.json(jsonResponseService("Error: Code must be 4 digits",[],400))
    }

    const collection = await DbService('OfficeGuestBook','Admin')
    const data = await collection.find({code: req.body.code}).toArray()

    if (Object.keys(data).length !== 0){
        return res.json(jsonResponseService("Code authentication successful",[{"authenticated":true}],200))
    }

    return res.json(jsonResponseService("Code authentication failed",[{"authenticated":false}],401))
}

const activeSignIns = async (req,res)=> {
    const collection = await DbService('OfficeGuestBook','GuestBook')
    const data = await collection.find({checkOutTime:{$exists:false}}).toArray()
    if (Object.keys(data).length === 0){
        return res.json(jsonResponseService("No matching records found",[],200))
    }
    data.forEach (item => {
            item.checkInTime=TimeStampConverterService.convertToHourMinuteString(item.checkInTime)
    })
    return res.json(jsonResponseService("Records retrieved successfully",data,200))
}

const getByName = async (req,res)=> {
    if(!("name" in req.body)||(req.body.name===null)||(req.body.name==="")){
        return res.json(jsonResponseService("Error: Name cannot be null/empty",[],400))
    }
    const collection = await DbService('OfficeGuestBook','GuestBook')
    const data = await collection.find({name:{$regex: req.body.name, $options: "i"}}).toArray()
    if (Object.keys(data).length === 0){
        return res.json(jsonResponseService("No matching records found",[],200))
    }
    data.forEach (item => {
        item.checkInTime=TimeStampConverterService.convertToHourMinuteString(item.checkInTime)
    })
    return res.json(jsonResponseService("Records retrieved successfully",data,200))
}

const signOutById = async (req,res)=> {

    if (!ObjectId.isValid(req.body.id)){
        return res.json(jsonResponseService("Error: Invalid ID",[],400))
    }

    let id = new ObjectId(req.body.id)

    const collection = await DbService ('OfficeGuestBook','GuestBook')

    let filter = {
        _id: id,
        checkOutTime: {
            $exists: false
        }
    }
    let update = {
        $set: {
            checkOutTime : Date.now()
        }
    }
    let options = {
        upsert: false,
        returnDocument: 'after'
    }

    const data = await collection.findOneAndUpdate(filter, update,options)
    if (data.value === null) {
        return res.json(jsonResponseService("Error: No matching checked in guest",[],400))
    }
    
    return res.json(jsonResponseService("Guest checked out successfully", [{
        "name": data.value.name,
        "company": data.value.company,
        "checkInTime": TimeStampConverterService.convertToHourMinuteString(data.value.checkInTime),
        "checkOutTime": TimeStampConverterService.convertToHourMinuteString(data.value.checkOutTime)
    }], 200))
}

exports.newSignIn = newSignIn
exports.verifyAdminCode = verifyAdminCode
exports.activeSignIns = activeSignIns
exports.getByName = getByName
exports.signOutById = signOutById