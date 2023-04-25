
const newCheckIn = async (collection,name,company) => {
    let checkInTime = Date.now()

    return await collection.insertOne({name,company,checkInTime})
}

exports.newCheckIn = newCheckIn