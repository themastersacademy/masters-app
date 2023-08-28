const User = require("../../models/user.js");
const crypto = require("crypto");
const { SendEmail } = require("../email/email.js");
const { generateOtp } = require("../../util/OTB.js");
const Batch = require("../../models/batch.js");
const Institution = require("../../models/institution.js");
const Goal = require("../../models/goal.js");
const Exam = require("../../models/exam.js");
const examState = require("../../models/examState.js");
const sessions = require("../../models/session.js");
const Course = require("../../models/course.js");
exports.login = async (req, res, next) => {
  const password = req.body.password;
  const secret = "This is a company secret ";
  const sha256Hasher = crypto.createHmac("sha256", secret);
  const hash = sha256Hasher.update(password).digest("hex");
  const check = await User.findOne({ email: req.body.email, password: hash });
  if (check) {
    let get = await sessions.find();
    const getVerify = await isLogin(get, check.email);
    // console.log(getVerify);
    // if (getVerify.length == 0) {

    req.session.isAuth = true;
    req.session.isLogin = true;
    req.session.userID = check._id;
    req.session.userRoll = check.type;
    req.session.userName = check.name;
    req.session.email = check.email;
    const State = await examState.findOne({ userID: check._id });
    if (State) {
      req.session.examID = State.examID;

      res.json({ status: "isExam" });
    } else {
      res.json({ status: "success", id: check._id, roll: check.type });
    }
    // } else {
    //   const isDelete = await sessions.deleteMany({
    //     expires: getVerify[0].expires,
    //   });
    //   req.session.isAuth = true;
    //   req.session.isLogin = true;
    //   req.session.userID = check._id;
    //   req.session.userRoll = check.type;
    //   req.session.userName = check.name;
    //   req.session.email = check.email;
    //   res.json({ status: "success", id: check._id, roll: check.type });
    // }
  } else {
    res.json({ status: "error", message: "Incorrect email or password " });
  }
};

function isLogin(data, email) {
  return data.filter((task) => task.session.email == email);
}

exports.create = async (req, res, next) => {
  console.log(req.body);
  const check = await User.findOne({ email: req.body.email });
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
    res.json({ status: "success", message: "Verify your account" });
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

  if (user) {
    goal.map((task) => {
      const collectTopic = [];
      const getID = []
      task.collections.map((task) => {

        task.topic.map((task1) =>
        {
          if( task.type == "group")  getID.push(task1.id)     
        }
        );
        collectTopic.push({
          type: task.type,
          topicName: task.type == "group" ? task.title : task.topic[0].title,
          topicId: task.type == "group" ? getID : [task.topic[0].id],
        })
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
    const userID = req.body.id;
    const user = await User.findOne({ _id: req.body.id });
    const goal = await Goal.find();
    const course = await Course.find();
    const exam = await Exam.find();

    if (user) {
      let check = [];
      let calcTolalQues = 0;
      let topic = {
        courseName: "",
        courseId: "",
        topic: [],
        duration: "",
        noOfQuestion: "",
        totalMArk: "",
      };
      user.goal.map((task) => check.push(task.valueOf()));

      const getUserGoal = goal.filter(
        (task) => check.indexOf(task._id.valueOf()) !== -1
      );
      check = [];
      const send = [];
      const studentsPerformance = [];
      getUserGoal.map((task, index) => {
        console.log(task);
        const topicName = []
        const topicAnalysis = []
        task.topics.map(task => {
          topicName.push(task.topicName)
          topicAnalysis.push(task.accuracy)
        })
        if (index == 0) studentsPerformance.push(
        {  
          score:task.examHistory,
          Analysis:{
            topicName,
            topicAnalysis
          }
        }

          );
        check.push(task.courseId.valueOf());
        send.push({
          courseName: task.courseName,
          coursePlan: task.plan,
          courseId: task.courseId,
        });
      });
      const get = course.filter(
        (task) => check.indexOf(task._id.valueOf()) !== -1
      );

      if (get.length > 0) {
        topic.courseId = get[0]._id;
        topic.courseName = get[0].title;
        get[0].collections.map((collection, index) => {
       
          if (collection.type == "topic") {
            collection.topic.map((task) => {
              if (
                eval(task.level.easy >= 0) &&
                eval(task.level.medium >= 0) &&
                eval(task.level.hard >= 0)
              ) {
                topic.topic.push({
                  title: task.title,
                  id: collection._id,
                  type: collection.type,
                  topicLength: collection.topic.length,
                  isSelect: false,
                  bankID: task.id,
                });
              }
            });
          } else if (collection.type == "group")
            collection.topic.map((task) => {
              if (
                eval(task.level.easy >= 0) &&
                eval(task.level.medium >= 0) &&
                eval(task.level.hard >= 0)
              ) {
                topic.topic.push({
                  title: collection.title,
                  id: collection._id,
                  type: collection.type,
                  topicLength: collection.topic.length,
                  isSelect: false,
                  bankID: task.id,
                });
              }
            });
        });
      }
      const getIndex = [];
      const retry = [];
      topic.topic.map((task) => {
        if (getIndex.indexOf(task.id.valueOf()) == -1) {
          getIndex.push(task.id.valueOf());
          retry.push(task);
        }
      });

      topic.topic = retry;
      if (get.length > 0) {
        get[0].collections.map((task, index) => {
          task.topic.map((task) => {
            calcTolalQues +=
              eval(task.level.easy) +
              eval(task.level.medium) +
              eval(task.level.hard);
          });
        });
        (topic.duration = get[0].duration),
          (topic.noOfQuestion = calcTolalQues),
          (topic.totalMArk = get[0].mark * calcTolalQues);
      }

      res.json({
        status: "ok",
        message: user,
        goal: getUserGoal,
        data: send,
        topic: topic,
        studentsPerformance: studentsPerformance[0],
      });
    }
  } catch (error) {
    res.json({ staus: "error", message: "something wrong" });
  }
};

exports.getGoal = async (req, res, next) => {
  try {
    const { id } = req.body;

    const course = await Course.find();
    const user = await User.findOne({ _id: id });
    const goal = await Goal.find();
    if (user) {
      let goalID = [];
      user.goal.map((task) => goalID.push(task._id.valueOf()));

      const getGoalID = goal.filter(
        (task) => goalID.indexOf(task._id.valueOf()) !== -1
      );

      goalID = [];
      getGoalID.map((task) => goalID.push(task.courseId.valueOf()));

      const getGoal = course.filter(
        (task) => goalID.indexOf(task._id.valueOf()) == -1
      );
      goalID = [];
      getGoal.map((task) => {
        if (task.status == "publish")
          goalID.push({ label: task.title, id: task._id });
      });
      res.json({ status: "ok", message: goalID });
    }
  } catch (error) {}
};

exports.addGoal = async (req, res, next) => {
  const { id, goal } = req.body;
console.log('goal call');
  try {
    const user = await User.findOne({ _id: id });
    const course = await Course.find();
    if (user) {
      const getGoalID = [];
      getGoalID.push(goal.id.valueOf());
      const getCourse = course.filter(
        (task) => getGoalID.indexOf(task._id.valueOf()) !== -1
      );

      getCourse.map(async (task) => {
        const collectTopic = [];
        task.collections.map((task) => {
          const getID = [];
          
          task.topic.map((task) => getID.push(task.id));
          collectTopic.push({
            type: task.type,
            topicName: task.type == "group" ? task.title : task.topic[0].title,
            topicId: getID,
          });
        });
       
        const createGoal = await Goal({
          courseName: task.title,
          courseId: task._id,
          userId: user._id,
          topics: collectTopic,
        });
console.log(createGoal)
        // createGoal.save();
        user.goal.push(createGoal._id);
      });
      // user.save();
      // res.json({ status: "success", message: "Add goal successfully" });
    }
  } catch (error) {
    res.json({ status: "error", message: "something wrong" });
  }
};

exports.getViewGoal = async (req, res, next) => {
  try {
    const userID = req.session.userID;
    const { getGoalId } = req.body;
    const course = await Course.findOne({ _id: getGoalId.courseId });
    const goal = await Goal.findOne({
      courseId: getGoalId.courseId,
      userId: userID,
    });

    if (course) {
      const send = [];
      let calcTolalQues = 0;
      const topic = {
        courseName: course.title,
        courseId: course._id,
        topic: [],
        topicLength: "",
        duration: "",
        noOfQuestion: "",
        totalMArk: "",
      };

      course.collections.map((collection, index) => {
        if (collection.type == "topic") {
          collection.topic.map((task) => {
            if (
              eval(task.level.easy >= 0) &&
              eval(task.level.medium >= 0) &&
              eval(task.level.hard >= 0)
            ) {
              topic.topic.push({
                title: task.title,
                id: collection._id,
                type: collection.type,
                isSelect: false,
                topicLength: collection.topic.length,
                bankID: task.id,
              });
            }
          });
        } else if (collection.type == "group")
          collection.topic.map((task) => {
            if (
              eval(task.level.easy >= 0) &&
              eval(task.level.medium >= 0) &&
              eval(task.level.hard >= 0)
            ) {
              topic.topic.push({
                title: collection.title,
                id: collection._id,
                type: collection.type,
                isSelect: false,
                topicLength: collection.topic.length,
                bankID: task.id,
              });
            }
          });
      });

      const getIndex = [];
      const retry = [];
      topic.topic.map((task) => {
        if (getIndex.indexOf(task.id.valueOf()) == -1) {
          getIndex.push(task.id.valueOf());
          retry.push(task);
        }
      });

      topic.topic = retry;

      course.collections.map((task, index) => {
        task.topic.map((task) => {
          calcTolalQues +=
            eval(task.level.easy) +
            eval(task.level.medium) +
            eval(task.level.hard);
        });
      });
      (topic.duration = course.duration),
        (topic.noOfQuestion = calcTolalQues),
        (topic.totalMArk = course.mark * calcTolalQues);

      res.json({ staus: "ok", topic: topic, goal: goal.examHistory });
    }
  } catch (error) {
    console.log(error);
  }
};
