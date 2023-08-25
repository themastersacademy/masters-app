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
  getViewGoal
 
} = require("../../controller/user/controller.js");

const { isExam } = require("../../util/checkLogin.js")
//get

//post
// login
router.post("/login", isExam,login);
// create account

router.post("/create", create);

// check otp
router.post("/checkOtp", checkOtp);

// create details
router.post("/createDetails", createDetails);

// choose goal
router.post("/chooseGoal", chooseGoal);

//request
router.post("/request", request);
// getUserData
router.post("/getUserData", getUserData);
//getGoal
router.post("/getGoal", getGoal);
//addGoal
router.post("/addGoal", addGoal);
//getViewGoal
router.post('/getViewGoal',getViewGoal)

module.exports = router;
