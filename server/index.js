//Imports
const express = require("express");
const route = require("./router/route.js");
const path = require("path");
const cors = require("cors")
const User = require("./models/user.js");

const {
  sessionManagement,
  AthuVerify,
  userVerify,
  isLogin,
  userCreate,
  isRoll
} = require("./auth/auth.js");
const connectDB = require("./util/connectDB.js");

//Initlization
require("dotenv").config();
const app = express();
app.disable('x-powered-by')
//Middleware

app.use(express.json());
app.use(express.text());
//MongoBD Connection
connectDB();
//Auth Session Management
sessionManagement(app);

// Static Files

//Server Route
app.use("/api", route);

//Application Route

console.log(app)
app.get('/isLogin',(req,res) =>{
  if(req.session.isLogin) res.json({status:'isLogin',id:req.session.userID})
  else res.json({status:'isLogout'})
  })


app.get("/", userVerify, (req, res) => {
  
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

/// user route

app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.json({status:'logout'})
})
app.get("/login",isLogin,(req, res) => {
 
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/signup", (req, res) => {
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

app.get("/admin/dashboard", isRoll,(req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/admin/bank/collection", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/manage", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/analytics", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/institution", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/bank", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.get("/admin/dashboard/course", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});


/// institute
app.get("/admin/institution/page", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.get("/admin/institution/page/batch", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});



/// static file
app.use("/", express.static(path.join(__dirname, "../client/build")));
//Server
app.listen(3001, () => {
  console.log(`Server start at port : ${process.env.PORT}`);
});
