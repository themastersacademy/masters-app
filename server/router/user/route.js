const router = require("express").Router();
const {
  create,
  checkOtp,
  createDetails,
  chooseGoal,
  login,
  request,
  getUserData,
  getGoal,
  addGoal,
  getViewGoal,
  resendOtp,
  forgotPass
 
} = require("../../controller/user/controller.js");
const {routerControl} = require('../../auth/auth.js')
const { isExam } = require("../../util/checkLogin.js")
//get
router.get('/resendOtp',resendOtp)
//post
// login
router.post("/login",login);
//forgetPass
router.post('/forgotPass',forgotPass)
// create account

router.post("/create", create);

// check otp
router.post("/checkOtp", checkOtp);

// create details
router.post("/createDetails", createDetails);

// choose goal
router.post("/chooseGoal", chooseGoal);

//request
router.post("/request",routerControl,request);
// getUserData
router.post("/getUserData",routerControl,getUserData);
//getGoal
router.post("/getGoal",routerControl,getGoal);
//addGoal
router.post("/addGoal",routerControl,addGoal);
//getViewGoal
router.post('/getViewGoal',routerControl,getViewGoal)

module.exports = router;
