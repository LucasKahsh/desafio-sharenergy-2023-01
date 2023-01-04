const db = require("../models");
const User = db.user;

exports.getAllUsers = async () => {
    return await User.find()
  };

exports.getUsers = async (page,perPage) => {
    return await User.find().limit(perPage).skip(perPage * page)
  };

exports.getUsersByUsername = async (username) => {
    return await User.findOne({
        username: username,
      })
  };