const User = require('../../models/user.js')
    ccav = require('./ccavutil.js'),
    qs = require('querystring')
    const {PaymentStatus} = require('../../util/paymentStatus.js')
exports.postReq = async function(req,res){
    try {
        const user = await User.findOne({_id:req.session.userID})
        const getID = await PaymentStatus(req)       
        if(user){
          req.session.payStatus = true
        var body = '',
          workingKey = '8A68D22226A1E903513F0052E902F52D',//Put in the 32-Bit key shared by CCAvenues.
          accessCode = 'AVNM05KJ28BL35MNLB',//Put in the Access Code shared by CCAvenues.
          encRequest = '',
          formbody = '';
          console.log(getID)
              body = qs.stringify({
                  merchant_id: '2895903',
                  order_id:getID.valueOf(),
                  currency: 'INR',
                  amount:req.session.totalAmount,
                  redirect_url: 'http://localhost:1338/payment/ccavResponseHandler',
                  cancel_url: 'http://localhost:1338/payment/ccavResponseHandler',
                  language: 'EN',
                  billing_name: user.name,
                  billing_country: 'India',
                  billing_tel: user.phoneNumber,
                  billing_email: user.email,
                  delivery_name: 'The Masters Academy',
                  delivery_address: 'Academy',
                  delivery_city:' Coimbatore',
                  delivery_state: 'TN',
                  delivery_zip: '641001',
                  delivery_country: 'India',
                  delivery_tel: '0123456789',
          
                 billing_address: user.address,
                 billing_city: user.city,
                 billing_state: user.state,
                 billing_zip: user.pincode,
            
                })
               
              encRequest = ccav.encrypt(body,workingKey); 
              formbody = '<form id="nonseamless" method="post" name="redirect" action="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';	
              res.writeHeader(200, {"Content-Type": "text/html"});
          res.write(formbody);
          res.end();
            }
          else{
            res.redirect('/')
          }
    } catch (error) {
        throw error
    }
  

};
