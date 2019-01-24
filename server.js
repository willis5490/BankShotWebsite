// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
const sgMail = require('@sendgrid/mail');
const request = require('request');
var https = require('https');
require("dotenv").config();

// Public Dir
// =============================================================

var options = {
  setHeaders: function (res, path, stat) {
    res.set({
      'Access-Control-Allow-Origin': '*',
      'Strict-Transport-Security': 'max-age=15780000; includeSubDomains'
    })
  }
}
app.use(express.static('public', options));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// API Routes
// =============================================================

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/shows", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/show.html"));
});
app.post('/send-email', function(req, res) {
  console.log(req.body)
  let Emial = JSON.stringify(req.body.email)
  let Name = JSON.stringify(req.body.name)
  let Message = JSON.stringify(req.body.message)
 
  sgMail.setApiKey(process.env.keys);
 
const msg = {
  to: "bankshotco@gmail.com",
  from: Emial,
  subject: Name + "wrote you an email",
  text: Message,
  html: Name + " has a message for Bankshot. The message is:   " + Message +"  my email is " + Emial,
  
};
console.log(msg.from)
console.log(msg.text)
sgMail.send(msg);
});


setInterval(function() {
  request
  .get('https://bankshot.herokuapp.com/')
  .on('response', function(response) {
    console.log(response.statusCode) 
    console.log(response.headers['content-type']) 
  })
  
}, 1200000);


// Starts the server to begin listening
// =============================================================
const PORT = process.env.PORT || 8080;



app.listen(PORT, function(error, response) {
  if (error) {
      console.log(error);
  }
  console.log(`Application listening on ${PORT}`);
   
})


// var service = https.createServer(options, app);
// service.listen(PORT, function(error, response){
//     if (error) {
//       console.log(error);
//   }
//   console.log(`Application listening on ${PORT}`);
// })