const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

router.get("/sendOTP", async (req, res) => {
  console.log(req.body.otp);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "akshaybisht80@gmail.com",
      pass: "yiffzwyokncgsytz",
    },
  });

  var OTP = Math.floor(100000 + Math.random() * 900000);
  var newDate = new Date();
  // let finalDate =
  //   newDate.getFullYear() +
  //   "-" +
  //   new String(newDate.getMonth() + 1).padStart(2, "0") +
  //   "-" +
  //   newDate.getDate() +
  //   " " +
  //   newDate.getHours() +
  //   ":" +
  //   new String(newDate.getMinutes()).padStart(2, "0") +
  //   ":" +
  //   newDate.getSeconds();

  // let finalDate = new String(newDate.getHours()).padStart(2, "0")+":"+new String(newDate.getMinutes()).padStart(2, "0")+":"+new String(newDate.getSeconds()).padStart(2, "0")
  const d1 = new Date();
  const finalDate = d1.getTime();

  console.log(typeof finalDate * 1);

  var mailOptions = {
    from: "akshaybisht80@gmail.com",
    to: "akshay.bisht@cynoteck.com",
    subject: "One-Time-Password for dummyTest App",
    text: `
        Hi,

        Thank you for choosing our dummyTest App. Use the following OTP to complete your Login procedure. 
        OTP is valid for 5 minutes.

        ${OTP}

        Regards,
        Your's Cynoteck Team`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log();
      res.status(200).json({
        message: "Redirect to Login.",
        isLogin: true,
        otp: OTP,
        otpTime: finalDate,
        sucess: true,
      });
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
