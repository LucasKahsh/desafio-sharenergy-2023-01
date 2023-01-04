const axios = require("axios");

exports.statusCode = async (req, res) => {
        let statusCode = req.params.code || 400
        axios.get(`https://http.cat/${statusCode}`, {
            responseType : 'arraybuffer' 
        }).then((response) => {
            res.set('Content-Type', 'image/jpeg');
            res.status(200).send(response.data);
        } ).catch(err => res.status(200).sendFile("/not-found.jpg", { root : './'}))
  };