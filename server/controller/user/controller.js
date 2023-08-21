const User = require("../../models/user.js");
const crypto = require("crypto");
const { SendEmail } = require("../email/email.js");
const { generateOtp } = require("../../util/OTB.js");
const Batch = require("../../models/batch.js");
const Institution = require("../../models/institution.js");
const Goal = require("../../models/goal.js");
const mongoose = require('mongoose')
const sessions =require('../../models/session.js')
exports.login = async (req, res, next) => {
  const password = req.body.password;
  const secret = "This is a company secret ";

  const sha256Hasher = crypto.createHmac("sha256", secret);

  const hash = sha256Hasher.update(password).digest("hex");
  const check = await User.findOne({ email: req.body.email, password: hash });
  if (check) {
  
    let get = await sessions.find()
    const getVerify  = await isLogin(get,check.email)   
    console.log(getVerify)
    if(getVerify.length == 0)
  {  req.session.isAuth = true;
    req.session.isLogin = true;
    req.session.userID = check._id;
    req.session.userRoll = check.type;
    req.session.userName = check.name
    req.session.email = check.email
    res.json({ status: "success", id: check._id, roll: check.type });
  }
  else{
   const isDelet  = await sessions.deleteMany({expires: getVerify[0].expires})
   req.session.isAuth = true;
    req.session.isLogin = true;
    req.session.userID = check._id;
    req.session.userRoll = check.type;
    req.session.userName = check.name
    req.session.email = check.email
    res.json({ status: "success", id: check._id, roll: check.type });
    }
    
  } else {
    res.json({ status: "error", message: "Incorrect email or password " });
  }
};


function isLogin (data,email){
 return data.filter(task => task.session.email == email)
}

exports.create = async (req, res, next) => {
  console.log(req.body);
  const check = await User.findOne({ email: req.body.email });
  console.log(check);
  if (!check) {
    req.session.isCreate = true;
    const password = req.body.password;
    const secret = "This is a company secret ";

    const sha256Hasher = crypto.createHmac("sha256", secret);

    const hash = sha256Hasher.update(password).digest("hex");

    req.session.isAuth = true;
    req.session.email = req.body.email;
    req.session.password = hash;
    const otp = generateOtp();

    req.session.Otp = otp;
    SendEmail(req.body.email, otp);
    res.json({ status: "success", message: "Account create successfully" });
  } else {
    res.json({ status: "error", message: "Account already exists " });
  }
};

exports.checkOtp = async (req, res, next) => {
  if (req.session.Otp == req.body.otp) {
    const createAccount = await User({
      email: req.session.email,
      password: req.session.password,
    });
    req.session.userID = createAccount._id;
    createAccount.save();
    res.json({ status: "success", message: "Account create successfully" });
  } else res.json({ status: "error", message: "The otp is not match" });
};

exports.createDetails = async (req, res, next) => {
  console.log(req.body);
  const user = await User.findOne({ _id: req.session.userID });
  if (user) {
    user.name = req.body.name;
    user.phoneNumber = req.body.phone;
    user.gender = req.body.gender;
    user.avatar = req.body.avatar;
    user.save();
    res.json({ status: "success", message: "Save the details successfully" });
  } else res.json({ status: "error", message: "Something wrong" });
};

exports.chooseGoal = async (req, res, next) => {
  const goal = req.body.goal;

  const user = await User.findOne({ _id: req.session.userID });
  // const user = await User.findOne({ _id:'64d91a8434866fe7d81ab1c0' });

  if (user) {
    goal.map((task) => {
      const collectTopic = [];
      task.collections.map((task) => {
        task.topic.map((task) =>
          collectTopic.push({ topicName: task.title, topicId: task.id })
        );
      });
      const createGoal = Goal({
        courseName: task.title,
        courseId: task._id,
        userId: user._id,
        topics: collectTopic,
      });
      createGoal.save();
      user.goal.push(createGoal._id);
    });

    user.save();

    res.json({ status: "success", message: "Save the details successfully" });
  } else res.json({ status: "error", message: "Something wrong" });
};

exports.request = async (req, res, next) => {
  const { instituteName, userID, instituteID, rollNumber, Dept, batchCode } =
    req.body.data;
  try {
    const user = await User.findOne({ _id: userID });
    if (user) {
      const institute = await Institution.findOne({ _id: instituteID });
      if (institute) {
        const batch = await Batch.findOne({
          batchCode: batchCode,
          institutionID: instituteID,
        });
        if (batch) {
          const check = [];
          batch.studentList.map((task) => {
            if (user.email == task.email) check.push(task);
          });

          if (check.length == 0) {
            batch.studentList.push({
              name: user.name,
              avatar: user.avatar,
              email: user.email,
              userID: user._id,
              rollNumber: rollNumber,
              dept: Dept,
            });
            batch.save();
            res.json({
              status: "success",
              message: "institute join request successfully",
            });
          } else
            res.json({ status: "error", message: "your already registered" });
        } else res.json({ status: "error", message: "something wrong" });
      } else res.json({ status: "error", message: "something wrong" });
    } else res.json({ status: "error", message: "something wrong" });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: req.body.id });
    if (user) {
      res.json({ status: "ok", message: user });
    }
  } catch (error) {
    res.json({ staus: "error", message: "something wrong" });
  }
};
