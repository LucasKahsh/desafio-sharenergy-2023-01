const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const axios = require('axios');
require('dotenv').config()

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "sharenergy-session",
    secret: process.env.COOKIE_SECRET || 'COOKIE_SECRET',
    httpOnly: true
  })
);

const db = require("./app/models");

db.mongoose.set('strictQuery', true);

db.mongoose
  .connect(process.env.URL_MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso.");
    populate();
  })
  .catch(err => {
    console.error("Erro na conexão ao banco.", err);
    process.exit();
  });

async function populate() {
    try{
        const User = db.user
        const users = await User.findOne({})
        if (!users){
            const newUser = new User({ username: 'desafiosharenergy',password:"r3n3rgy",fullName:'Sharenergy Startup',email:'desafiosharenergy@gmail.com',age:10});
            newUser.save()
            for(let i = 0; i < 40; i++){
                const req = await axios.get('https://randomuser.me/api/',{headers: { "Accept-Encoding": "gzip,deflate,compress" } })
                const tempUser = await req.data.results[0]
                const randomUser = new User({picture: tempUser.picture, username: tempUser.login.username ,password:tempUser.login.password, fullName: tempUser.name.first + " " + tempUser.name.last,email:tempUser.email,age:tempUser.dob.age})
                randomUser.save()
            }
            console.log('Banco de dados populado com sucesso!')
        }
    }
    catch(err){
        throw err
    }
  }
  
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/client.routes')(app);
require('./app/routes/status.routes')(app);
require('./app/routes/dog.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});