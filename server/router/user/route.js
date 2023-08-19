const router = require("express").Router();
const {create,checkOtp,createDetails,chooseGoal,login,requirest,getUserData} = require('../../controller/user/controller.js')

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

//requirest
router.post('/requirest',requirest)
// getUserData
router.post('/getUserData',getUserData)

module.exports=router