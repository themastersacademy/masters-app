var nodemailer = require("nodemailer");

exports.SendEmail = (email, OTP) => {
  var transporter = nodemailer.createTransport({
    host: process.env.HOST,
    name: process.env.NAME,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Sending Email using Node.js",
    text: OTP,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
