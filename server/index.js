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
  sessionDistroy

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

app.get("/isLogin", (req, res) => {
  if (req.session.isLogin)
   { 
    if(req.session.examID){
      res.json({ status: "isExam", message:'go to exam'});
    }
    else return res.json({ status: "isLogin", id: req.session.userID });
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
app.get("/login/goal", userCreate, (req, res) => {
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
