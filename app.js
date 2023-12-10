var express = require('express');
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/signup');
var db = mongoose.connection;
db.on('error', console.log.bind(console, "Connection error"));
db.once('open', function(callback){
    console.log('connection successful!');
})



var app = express()

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/signup' , function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.password;
    var phone = req.body.phone;
    var dob = req.body.dateOfBirth;
    
    var data = {
        "name" : name,
        "email" : email,
        "password": pass,
        "phone": phone,
        "dateOfBirth": dob
    }
    db.collection('details').insertOne(data, function(err, collection) {
        if (err) throw err;
            console.log("Record Inserted successfully!");
    });
    return res.redirect('success.html');
})

app.get('/', function(req, res){
    res.set({
        'Access-control-Allow-Origin': '*'
    });
    return res.redirect('index.html');
}).listen(3000)

console.log('server listening at port 3000');