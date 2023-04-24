const { MongoClient } = require("mongodb");

const url = "mongodb://root:password@localhost:27017"

const dbService = async (dbName,collectionName) => {
    const connection = await MongoClient.connect(url)
    const db = connection.db(dbName)
    const collection = db.collection(collectionName)
    return collection
}

module.exports = dbService