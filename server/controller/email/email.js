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
    subject: "[The Master Academy] Please verify your account",
  
    html: `<div class="container">
            <div class="header">
                <div class="logo"  style="display:flex; justify-content: center;gap:10px" >
                    <img style="width:50px;height: 50px;" src="https://upload.incrix.com/search?url=/file/MasterAcademy/image/file-1693418599867.svg" alt="Company Logo">
                    <p>The Masters Academy</p>
                </div>
            </div>
            <div class="content">
              
                <p>Your One-Time Password (OTP) is:</p>
                <div style="display:flex; justify-content: center">
                <div style="display:flex; justify-content: center";gap:10px>
                    <div class="otp-block">${ OTP[0] }</div>
                    <div class="otp-block">${ OTP[1] }</div>
                    <div class="otp-block">${ OTP[2] }</div>
                    <div class="otp-block">${ OTP[3] }</div>
                </div>
            </div>
                <p>Please use this OTP to complete your verification process.</p>
              
            </div>
            <div class="footer">
                <p style="color: #187163;">Best regards,<br>The Masters Academy</p>
            </div>
        </div>
    `
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

