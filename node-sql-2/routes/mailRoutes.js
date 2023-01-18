const nodemailer = require('nodemailer');
const express = require("express");
const router = express.Router();
const db = require("../models");


router.post("/sendmail", async (req, res) => {

  const emailCheck = await db.Users.findOne({
    where: {
      email: req.body.email,
    },
  });

  if (!emailCheck) {
    res.send({ success: false, message: "Email Not Found! Please enter a valid email." });
  }
  else
  {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      secure: false,
      auth: {
        user: 'akshaybisht80@gmail.com',
        pass: 'yiffzwyokncgsytz'
      },   
    });
    
    var mailOptions = {
      from: 'akshaybisht80@gmail.com',
      to: req.body.email,
      subject: 'Reset Your Password',
      text: `Hello User,

      Somebody requested a new password for the dummyTest app account 
      associated with ${req.body.email}.
      
      No changes have been made to your account yet.
      
      You can reset your password by clicking the link below:
      
      If you did not request a new password, please let us know immediately by replying to this email.
      
      Yours,
      The Cynoteck React Team`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        // console.log('Email sent: ' + info.response);
        res.status(200).json({message: "Mail sent successfully!", success: true})
      }
    });
  }
  }); 

  module.exports = router;