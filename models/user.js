const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getCollection = () => {
  return mongodb.getDb().collection("users");
};

const createUser = async (user) => {
  return await getCollection().insertOne(user);
};

const findUserByEmail = async (email) => {
  return await getCollection().findOne({ email: email });
};

module.exports = {
  createUser,
  findUserByEmail
};
