const { MongoClient } = require("mongodb");

let database;

const initDb = async (callback) => {
  if (database) {
    return callback(null, database);
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    database = client.db("project2");
    console.log("Connected to MongoDB");
    callback(null, database);
  } catch (err) {
    callback(err);
  }
};

const getDb = () => database;

module.exports = { initDb, getDb };
