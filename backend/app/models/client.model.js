const mongoose = require("mongoose");

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    _id: Schema.ObjectId,
    name: String,
    email: String,
    phone: String,
    address : String,
    cpf:String,
  })
);

module.exports = Client;