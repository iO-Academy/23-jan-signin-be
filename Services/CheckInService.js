
const newCheckIn = async (collection,name,company,checkInTime) => {
    return await collection.insertOne({name,company,checkInTime})
}



exports.newCheckIn = newCheckIn