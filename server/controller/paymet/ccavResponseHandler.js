var ccav = require("./ccavutil.js"),
  qs = require("querystring");
  const Payment = require("../../models/payment");
const User = require("../../models/user.js");
const Goal = require('../../models/goal.js')
const {invoiceEmail} = require('../email/invoiceEmail.js')
exports.postRes = async function (request, response) {

  var ccavEncResponse = "",
    ccavResponse = "",
    workingKey = "8A68D22226A1E903513F0052E902F52D", //Put in the 32-Bit key shared by CCAvenues.
    ccavPOST = "";
  
  request.on("data", function (data) {
    ccavEncResponse += data
    ccavPOST = qs.parse(ccavEncResponse)
    var encryption = ccavPOST.encResp;
    ccavResponse = ccav.decrypt(encryption, workingKey);
  });

  request.on("end", async function () {
    const check = qs.parse(ccavResponse);
    console.log(check)
    const payment = await Payment.findOne({_id:check.order_id})
    
    if (check.order_status == "Success") {
     
      await updatePlan(payment,check.order_id)
      var pData = "";
      // pData = "<table border=1 cellspacing=2 cellpadding=2><tr><td>";
      // pData = pData + ccavResponse.replace(/=/gi, "</td><td>");
      // pData = pData.replace(/&/gi, "</td></tr><tr><td>");
      // pData = pData + "</td></tr></table>";
      // htmlcode =
      //   '<html><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><title>Response Handler</title></head><body><center><font size="4" color="blue"><b>Response Page</b></font><br>' +
      //   pData +
      //   "</center><br></body></html>";
      // response.writeHeader(200, { "Content-Type": "text/html" });
      // response.write(htmlcode);
      // response.end();
    
      return response.redirect('/success')
    } else {
      payment.status = 'failed'
      payment.save()
     return response.redirect('/failure')
    }
  });
};

const updatePlan = async (data,orderID) =>{
  try {
      
      const user = await User.findOne({_id:data.userID})
      const payment = await Payment.findOne({_id:orderID})
      const goal = await Goal.findOne({userId:user._id,courseId:data.courseID})
      if(user && payment && goal)
      {
        const date = new Date()
        date.setMonth(date.getMonth() + eval(payment.planMonth))
        let indianTime = date.toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
          hour12: false,
        });
        const month = indianTime.split(',')[0]
        const time =  indianTime.split(',')[1].trim()
     
        payment.validDate = month
        payment.validTime = time
        payment.status = 'success'
        payment.save()
        invoiceEmail(user.email,payment)
       goal.plan = 'pro'
       goal.planValidDate = month
       goal.planValidTime = time
       goal.save()
      }
  } catch (error) {
    throw error
  }
}
