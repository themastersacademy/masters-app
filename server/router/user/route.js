const router = require("express").Router();
const {create,checkOtp,createDetails,chooseGoal,login,request,getUserData} = require('../../controller/user/controller.js')

// login
router.post('/login',login)
// create account

router.post('/create',create)

// check otp 
router.post('/checkOtp',checkOtp)


// create details
router.post('/createDetails',createDetails)

// choose goal
router.post('/chooseGoal',chooseGoal)

//request
router.post('/request',request)
// getUserData
router.post('/getUserData',getUserData)

module.exports=router