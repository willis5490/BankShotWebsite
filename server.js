// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');
require("dotenv").config();

// Public Dir
// =============================================================
app.use(express.static("public"));
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
  var mailOptions = {
      from: req.body.name, // sender address
      to: 'bankshotco@gmail.com', // list of receivers
      subject: `New Message from ${req.body.name}`, // Subject line
      text: `${req.body.name}'s message:  ${req.body.message}....................Respond to ${req.body.email}` // plaintext body

  };
      smtpTransport.sendMail(mailOptions, function(error, info) {
       if (error) {
           return console.log(error);
       }
       console.log('Message sent: ' + info.response);
   });
res.json('everything worked')
});



// emial setup
// =============================================================
var smtpTransport = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'bankshotco@gmail.com',
    pass: process.env.MAILPASSWORD
  }
}));



// Starts the server to begin listening
// =============================================================
const PORT = process.env.PORT || 8080;

app.listen(PORT, function(error, response) {
  if (error) {
      console.log(error);
  }
  console.log(`Application listening on ${PORT}`);
  
})
