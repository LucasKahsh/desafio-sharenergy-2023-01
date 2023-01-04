const axios = require("axios");
const jsdom = require("jsdom");
var jQuery = require('jquery');
exports.dog = async (req, res) => {
    const response = await axios.get('https://random.dog/')
    const { window } = new jsdom.JSDOM(response.data);
    try{
        const src = jQuery(window).find('img')[0].src
        res.send({src})
    }catch(err){
        try{
            const src = jQuery(window).find('source')[0].src
            res.send({src})
        }catch(error){
            throw error
        }
    }
  };