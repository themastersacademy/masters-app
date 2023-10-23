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

const {getUserDetails } = require("../../controller/admin/user/user.js");

const {
  getInstituteName
} = require("../../controller/admin/institute/institute.js");

const {userRouterControl} = require('../../auth/auth.js')
const { isExam } = require("../../util/checkLogin.js")
//get
router.get('/resendOtp',resendOtp)
router.get("/getInstitute", getInstituteName);
router.get("/getUserDetails",getUserDetails)
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
router.post("/request",userRouterControl,request);
// getUserData
router.post("/getUserData",userRouterControl,getUserData);
//getGoal
router.post("/getGoal",userRouterControl,getGoal);
//addGoal
router.post("/addGoal",userRouterControl,addGoal);
//getViewGoal
router.post('/getViewGoal',userRouterControl,getViewGoal)

module.exports = router;
