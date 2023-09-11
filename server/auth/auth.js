
const session = require("express-session");
const mongoDBstore = require("connect-mongodb-session")(session);
const examState = require("../models/examState");
const User = require('../models/user')

exports.sessionManagement = async (app) => {
  const store = new mongoDBstore({
    uri: process.env.MONGODBURL,
    collection: "sessions",
  });

  // Catch errors
  store.on("error", function (error) {});
  app.use(
    session({
      secret: "This is a secret",
      resave: false,
      httpOnly: true,
      saveUninitialized: false,
      cookie: {
        // expires: 60000
      },
      store: store,
    })
  );
};

exports.AthuVerify = (req, res, next) => {
  if (req.session.isAuth) {
    // req.session.UserRoll = "Admin"
    next();
  } else {
    res.redirect("/");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.session.UserRoll == "Admin") {
    next();
  } else {
    res.json({
      status: 401,
      message: "Your are not authorized to access",
    });
  }
};

exports.isUser = (req, res, next) => {
  if (req.session.UserRoll == "Admin") {
    next();
  } else {
    res.json({
      status: 401,
      message: "Your are not authorized to access",
    });
  }
};

exports.userVerify = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.userRoll == "student") next();
    if (req.session.userRoll == "teacher" || req.session.userRoll == "admin" ||  req.session.userRoll == " institution")
      res.redirect(`/admin/dashboard?=${req.session.userID}`);
  } else {
    res.redirect("/login");
  }
};
exports.userCreate = (req, res, next) => {
  if (req.session.isCreate) {
    next();
  } else {
    res.redirect("/signup");
  }
};

exports.isLogin = (req, res, next) => {
  if (req.session.isAuth) {
    if (req.session.examID) res.redirect(`/exam/state?=${req.session.examID}`);
    else if (
      req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == " institution"
    )
     {
      console.log('call institute');
      return res.redirect(`/admin/dashboard?=${req.session.userID}`);}
    else return res.redirect(`/?=${req.session.userID}`);
  } else {
    next();
  }
};
exports.isSignIn = (req, res, next) => {
  if (req.session.isAuth) {
    next();
  } else {
    res.redirect(`/login`);
  }
};
exports.isRoll = async (req, res, next) => {
  try {
    if (req.session.isAuth) {
      if (req.session.userRoll == "teacher" || req.session.userRoll == "admin" || req.session.userRoll == " institution" )
        next();
      else res.redirect(`/?=${req.session.userID}`);
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.log();
  }
};

exports.examInfo = async (req, res, next) => {
  try {
   
    if (!req.session.examID) {

      const State = await examState.findOne({ userID: req.session.userID });
      if (State) {
       
        req.session.examID = State.examID;
       return res.redirect(`/exam/state?=${req.session.examID}`);
      } else if (req.session.examID) {
      
       return res.redirect(`/exam/state?=${req.session.examID}`);
      } 
     return next()
    } else {
      res.redirect(`/exam/state?=${req.session.examID}`);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.checkExamInfo = async (req, res, next) => {
  try {
      const State = await examState.findOne({ userID: req.session.userID });
      if (State) {
       
        req.session.examID = State.examID;
       return res.redirect(`/exam/info?=${req.session.examID}`);
      } 
       if (req.session.examID) {
      
       return res.redirect(`/exam/info?=${req.session.examID}`);
      } 
     return res.redirect(`/login`);
    
  } catch (error) {
    console.log(error);
  }
};
exports.isValueExam = async (req, res, next) => {
  try {
    if (
            req.session.userRoll == "teacher" ||
            req.session.userRoll == "admin" ||
            req.session.userRoll == "institution"
          )
            return res.redirect(`/login`);
    if (req.session.examID) {
      next();
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.log(error);
  }
};

// exports.isValueExam = async (req, res, next) => {
//   try {
//     if (
//       req.session.userRoll == "teacher" ||
//       req.session.userRoll == "admin" ||
//       req.session.userRoll == "institution"
//     )
//       return res.redirect(`/login`);
//     if (req.session.examID) {
//       next();
//     } else {
//       res.redirect("/");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.isSignIn = (req, res, next) => {
  if (req.session.isAuth) {
    if (
      req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == "institution"
    )
      return res.redirect(`/login`);
    if (req.session.examID) next();
    else res.redirect(`/login`);
  } else {
    res.redirect(`/login`);
  }
};

exports.routerControl = async(req,res,next) =>{
  try {
    if(req.session.isAuth) next()
    else res.status(500).send('text')
  } catch (error) {
    console.log(error);
  }
}

exports.sessionDistroy = async(req,res,next) =>{
  try {
    if(req.session.isAuth)  return res.redirect(`/?=${req.session.userID}`);
    else next()
  } catch (error) {
    console.log(error);
  }
  }

// goal auth

exports.verifyGoal = async (req,res,next) =>{
try {
  const user = await User.findOne({
   email:req.session.email
  });
  if(user){
    if(user.goal.length == 0) next()
    else res.redirect('/login')
  }
} catch (error) {
  console.log(error);
}
}