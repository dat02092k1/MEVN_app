var express = require('express'); 

var server = express();

var routes = require('./routes/routes'); 
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
const cors = require('cors');  
const { urlencoded } = require('express');

mongoose.connect("mongodb://localhost:27017/mevn", { useNewUrlParser: true, useUnifiedTopology: true } , function checkDb(err) {
    if (err) {
        console.log('err')
    }
    else {
        console.log('db connected');
    }
} );


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));


server.use(routes);
server.use(cors());

server.listen(8000, function check(err) {
    if (err) console.log('err');
    else console.log('started');
});   
