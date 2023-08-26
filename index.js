// Import des packages
const express = require('express');
const bodyParser = require('body-parser');
const jsonServer = require('json-server');
const router = require('./routes/router');

// Le Middleware json-server avec table tasks
const jsm = jsonServer.router('db.json');
//pour ne pas avoir doublant, on mis une fois pour toute

//serveur express
const app = express();
// app.use et app.set
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); 
app.use('/api', jsm); 
//ajout fonction d'image
app.use("/images",express.static("images"));
app.use(router);
//configurer avec set
app.set('view engine', 'ejs');

// Je suis le dernier de la liste !
app.listen(3000, () => console.log('Le serveur est lancé sur le port 3000'));