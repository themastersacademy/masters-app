var nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

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

  const emailTemplatePath = path.join(
    __dirname,
    "./otb.ejs"
  );


  const emailTemplate = fs.readFileSync(emailTemplatePath, "utf-8");
  const renderedTemplate = ejs.render(emailTemplate, {OTP})
  var mailOptions = {
    from: process.env.USER,
    to: email,
    // subject: "Sending Email using Node.js",
    // text: OTP,
    html: renderedTemplate
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
