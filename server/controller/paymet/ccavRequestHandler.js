const User = require('../../models/user.js')
    ccav = require('./ccavutil.js'),
    qs = require('querystring');

exports.postReq = async function(req,res){
    try {
        const user = await User.findOne({_id:req.session.userID})
        if(user){
        var body = '',
          workingKey = '8A68D22226A1E903513F0052E902F52D',//Put in the 32-Bit key shared by CCAvenues.
          accessCode = 'AVNM05KJ28BL35MNLB',//Put in the Access Code shared by CCAvenues.
          encRequest = '',
          formbody = '';
              body = qs.stringify({
                  merchant_id: '2895903',
                  order_id: '1234',
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
                // merchant_id: '2895903',
                // order_id: '1234',
                // currency: 'INR',
                // amount: '9.00',
                // redirect_url: 'http://localhost:1338/payment/ccavResponseHandler',
                // cancel_url: 'http://localhost:1338/payment/ccavResponseHandler',
                // language: 'EN',
                // billing_name: 'Peter',
                // billing_address: 'Santacruz',
                // billing_city: 'Mumbai',
                // billing_state: 'MH',
                // billing_zip: '400054',
                // billing_country: 'India',
                // billing_tel: '9876543210',
                // billing_email: 'testing@domain.com',
                // delivery_name: 'Sam',
                // delivery_address: 'Vile Parle',
                // delivery_city: 'Mumbai',
                // delivery_state: 'Maharashtra',
                // delivery_zip: '400038',
                // delivery_country: 'India',
                // delivery_tel: '0123456789',
                // merchant_param1: 'additional Info.',
                // merchant_param2: 'additional Info.',
                // merchant_param3: 'additional Info.',
                // merchant_param4: 'additional Info.',
                // merchant_param5: 'additional Info.',
                // promo_code: '',
                // customer_identifier: ''
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
