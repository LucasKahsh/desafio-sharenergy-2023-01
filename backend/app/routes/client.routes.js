const { authJwt } = require("../middlewares");
const {
  getAllClients,
  createClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  
  app.get("/api/client", [authJwt.verifyToken], getAllClients);
  app.post("/api/client", [authJwt.verifyToken], createClient);
  app.get("/api/client/:id", [authJwt.verifyToken], getClientById);
  app.patch("/api/client/:id", [authJwt.verifyToken], updateClient);
  app.delete("/api/client/:id", [authJwt.verifyToken], deleteClient);
};