//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

app.use(express.static('tutorwebapp'));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.listen(8080);


