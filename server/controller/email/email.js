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
    subject: "[The Master Academy] Please verify your account",
  
    html: textHtml(OTP)

  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};


const textHtml = (OTP) =>{
  return`<!DOCTYPE html>
  <html>
  <head>
      <title>OTP Email</title>
      <style>
          body {
              font-family: Arial, sans-serif;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border: 1px solid #ccc;
              border-radius: 5px;
          }
          .header {
             
              
              padding: 10px;
              border-radius: 5px 5px 0 0;
          }
          .logo {
             display: flex;
             justify-content: center;
             align-items: center;
             gap: '10px';
             
  
          }
          .content {
              padding: 20px;
          }
          .otp-container {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-top: 20px;
              gap: 20px;
          }
          .otp-block {
              width: 50px;
              height: 50px;
              border: 2px solid #187163;
              border-radius: 5px;
              font-size: 24px;
              margin-right: 10px;
              margin-left: 10px;
              text-align: center;
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .footer {
              background-color: #f4f4f4;
              padding: 10px;
              text-align: center;
              border-radius: 0 0 5px 5px;
          }
          .otp-align{
              display: flex;
              align-items: center;
              width: 100%;
              height:300px;
              justify-content: center;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">
              <div class="logo"  >
                  <img style="width:50px;height: 50px; margin-right:10px" src='https://upload.incrix.com/search?url=/file/MasterAcademy/image/file-1693460630628.png' alt="Company Logo">
                  <p style="
                  font-family: DM Sans;
                  font-size: 18px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal" > The <font  color="#FEA800"  >Masters Academy </font> </p>
              </div>
          </div>
          <div  class="content">
            
              <p>Your One-Time Password (OTP) is:</p>
              <div style="display:flex; justify-content: center">
              <div class="otp-container">
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
  </body>
  </html>`
}