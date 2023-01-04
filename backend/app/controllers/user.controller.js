const { getAllUsers, getUsers } = require("../services/user.services");

exports.userBoard = async (req, res) => {
  let page = req.query.page || 0
  let perPage = req.query.perpage || 10

  const Users = await getUsers(page,perPage)
  res.status(200).send(Users);
  };

exports.userAll = async (req, res) => {
    const Users = await getAllUsers()
    res.status(200).send(Users);
};