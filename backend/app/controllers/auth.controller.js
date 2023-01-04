const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

var jwt = require('jsonwebtoken');
const { getUsersByUsername } = require("../services/user.services");

exports.signin = async (req, res) => {

  if(!req.body.username  ||  !req.body.password){
    return res.status(401).send({ message: "Must be passed username and password." });
  }
  
  const user = await getUsersByUsername(req.body.username)
  
      if (!user) {
        return res.status(401).send({ message: "User Not found." });
      }

      var passwordIsValid = req.body.password === user.password;

      if (!passwordIsValid) {
        return res.status(401).send({ message: "Invalid Password!" });
      }

      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400
      });

      req.session.token = token;

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        token: token
      });
    };
;

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
