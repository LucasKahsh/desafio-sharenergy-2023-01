const db = require("../models");
const Client = db.client;
const mongo = require('mongodb');


exports.getAllClients = async () => {
  return await Client.find();
};
 
exports.createClient = async (data) => {
  Client.init()
  let id = new mongo.ObjectId()

  const client = new Client({
    _id: id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    address : data.address,
    cpf:data.cpf
  })
  await client.save()
  return client;
};

exports.getClientById = async (id) => {
  return await Client.findById(id);
};
 
exports.updateClient = async (id, blog) => {
  return await Client.findByIdAndUpdate(id, blog);
};
 
exports.deleteClient = async (id) => {
  return await Client.findByIdAndDelete(id);
};