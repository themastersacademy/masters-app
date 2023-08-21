const session = require("express-session");
const mongoDBstore = require("connect-mongodb-session")(session);



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
      httpOnly:true,
      saveUninitialized:false,
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
    if(req.session.userRoll == 'student') next();
    if(req.session.userRoll == 'teacher') res.redirect(`/admin/dashboard?=${req.session.userID}`);
  } else {
    res.redirect("/login")
  }
};
exports.userCreate = (req, res, next) => {
  if (req.session.isCreate) {
    next();
  } else {
    res.redirect("/signup");
  }
};

exports.isLogin = (req, res, next) =>{
 console.log('login');
  if (req.session.isAuth){
    console.log('isAtuth');
    if(req.session.userRoll == 'teacher')  res.redirect(`/admin/dashboard?=${req.session.userID}`);
    else
    res.redirect(`/?=${req.session.userID}`);
  } else {
    next()
  }
}

exports.isRoll= async(req,res,next) =>{
try {
  if (req.session.isAuth) {
    if(req.session.userRoll == 'teacher') next()
    else res.redirect(`/?=${req.session.userID}`);
  } else {
    res.redirect("/login");
  }
} catch (error) {
  console.log();
}
}