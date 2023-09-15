//Imports
const express = require("express");
const route = require("./router/route.js");
const path = require("path");
const cors = require("cors");

const {
  sessionManagement,
  AthuVerify,
  userVerify,
  isLogin,
  userCreate,
  isRoll,
  examInfo,
  isValueExam,
  isSignIn,
  checkExamInfo,
  sessionDistroy,
  verifyGoal

} = require("./auth/auth.js");
const connectDB = require("./util/connectDB.js");
const app = express();

app.set('view engine', 'ejs');
//Initlization
require("dotenv").config();

app.disable("x-powered-by");
//Middleware

app.use(express.json());
app.use(express.text());
//MongoBD Connection
connectDB();
//Auth Session Management
sessionManagement(app);


//Server Route
app.use("/api",route);
app.use(cors())
//Application Route

const fs = require('fs')
const json2xls = require('json2xls');

// Example JSON
// const json = [{firstName: 'Bob', name: 'Lennon',batch:'Muthu'}, {firstName: 'Jack', name: 'Sparrow',batch:'Muthu'}]

// const xls = json2xls(json);

// fs.writeFileSync('exported.xlsx', xls, 'binary');
// const folderPath = __dirname;
// app.get('/download',(req,res)=>{
//   console.log('call');

//   res.download(folderPath +'/exported.xlsx' , function(err) {
//     if(err) {
//         console.log(err);
//     }
// })
// })

app.get("/isCheck", (req, res) => {
  if (req.session.isAuth)
   { 
    return res.json({ status: "isLogin" });
  }
  else return res.json({ status: "isLogout" });
});
app.get("/isLogin", (req, res) => {
  if (req.session.isLogin)
   { 
    if(req.session.examID){
      res.json({ status: "isExam", message:'go to exam'});
    }
    else{ 
      if(req.session.userRoll == 'student')  return res.json({ status: "isLogin" ,roll: req.session.userRoll, id: req.session.userID });
      else if (     req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == "institution")
      return res.json({ status: "isLogin" ,roll: req.session.userRoll, id: req.session.userID });
     
    } 
  }
  else return res.json({ status: "isLogout" });
});

app.get("/",examInfo,userVerify, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/// user route

app.get("/logout",(req, res) => {
  req.session.destroy();
  res.json({ status: "logout" });
});
app.get("/login", isLogin, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/signup",sessionDistroy,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/login/create", userCreate, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/login/verify", userCreate, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/login/goal", userCreate,verifyGoal, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/// admin route

app.get("/admin/dashboard", isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/admin/bank/collection",isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/manage",isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/analytics",isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/institution", isRoll,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/bank", isRoll,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/dashboard/course",isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/// institute
app.get("/admin/institution/page", isRoll, (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/admin/institution/page/batch",isRoll,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/// exam route


app.get("/exam/info", checkExamInfo,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/exam/state",isValueExam,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/exam/result",isSignIn,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/exam/solution",isSignIn,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});







// Static Files
app.use("/", express.static(path.join(__dirname, "../client/build")));

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.status || 500;
  const message = "Something went wrong";
  const data = err.data || null;
  res.status(status).json({
    statue: 500,
    type: "error",
    message,
    data,
});
});

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

//Server
app.listen(3001, () => {
  console.log(`Server start at port : ${process.env.PORT}`);
});
