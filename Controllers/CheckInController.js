const DbService = require("../Services/DbService");
const CheckInService = require("../Services/CheckInService");
const jsonResponseService = require("../Services/jsonResponseService");

const newSignIn = async (req,res)=> {
    let name = req.body.name
    let company = req.body.company

    if(Object.keys(req.body).length === 0) {
        return res.json(jsonResponseService("Error: Request cannot be empty",[],500))
    }

    let strRegex = /^[a-z ,.'-]+$/
    console.log(name)

    if(name===null){
        return res.json(jsonResponseService("Error: Name cannot be null",[],400))
    }
    if(!strRegex.test(name)){
        return res.json(jsonResponseService("Error: Name failed validation",[],400))
    }
    if(!strRegex.test(company)) {
        return res.json(jsonResponseService("Error: Company failed validation",[],400))
    }

    const collection = await DbService('OfficeGuestBook','GuestBook')
    const data = await CheckInService.newCheckIn(collection,name,company)
    if(data.insertedId !== null) {
        return res.json(jsonResponseService("Checked in successful",[],200))
    } else {
        return res.json(jsonResponseService("Check in failed",[],400))
    }
}

exports.newSignIn = newSignIn