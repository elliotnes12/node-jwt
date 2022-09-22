require('dotenv').config();
const express = require('express');
const {dbConnection} = require('./batabase/config');
const cors = require('cors');
const { json } = require('express');


const app = express();

app.use(json());

//configurar CORS

app.use(cors());

//carpeta publica

app.use(express.static('public'));


//Base de datos

dbConnection();

app.use('/api/usuarios',require('./routes/usuarios'));

app.use('/api/login/google',require('./routes/auth'));

app.use('/api/login',require('./routes/auth'));


app.listen(process.env.PORT ,() =>{

     console.log('estamos corriendo por el puerto' ,process.env.PORT);
});