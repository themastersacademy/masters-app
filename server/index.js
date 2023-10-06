//Imports
const express = require("express");
const route = require("./router/route.js");
const path = require("path");
const cors = require("cors");

const {DateTime} = require('luxon')

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

// const fs = require('fs')
// fs.writeFile("myjsonfile.json", JSON.stringify( [
//   {
//     currentBankID :"6501ff8b10d5416761c09245",
//     changeBankID :"64ca4be0b1881bce7538cf54",
//   easy:12,
//   medium:10,
//   hard:11,
//   total:33
// }
// ], null, 4), (err) => {
//   if (err) {  console.error(err);  return; };
//   console.log("File has been created");
// });




app.get('/getTime',(req,res)=>{

//  const getTime = DateTime.fromISO(`2015-03-04T00:00:00.000Z`).setZone("Asia/Kolkata");

//  let examDateObject =new Date();
//   examDateObject.setTime(getTime.ts)
//  console.log(examDateObject);
//   res.send(examDateObject)
let date3 = new Date();
  let indianTime = date3.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
  const get = indianTime.split(",")[0].split('/')
  const get1 = indianTime.split(",")[1].split(':')
 const getTime = DateTime.fromISO(`${get[2]}-${get[0]}-${get[1]}T${get1[0]}:${get1[1]}:${get1[2]}.000Z`).setZone("Asia/Kolkata");

 let examDateObject = new Date();
 console.log(examDateObject.ts);
  examDateObject.setTime(getTime.ts)
 console.log(examDateObject.getMinutes());
  res.json({time:examDateObject.getHours()})
})

let date3 = new Date();
  let indianTime = date3.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
  const get = indianTime.split(",")[0].split('/')
  const get1 = indianTime.split(",")[1].split(':')
console.log(indianTime.split(",")[0].split('/'));


const first = DateTime.fromISO(`${get[2]}-${get[0]}-${get[1]}T${get1[0]}:${get1[1]}:${get1[2]}.000Z`).setZone("Asia/Kolkata").invalid.explanation.slice(11,45)
const two =   DateTime.fromISO(`2023-10-6T 09:30:00.000Z`).setZone("Asia/Kolkata").invalid.explanation.slice(11,45)
let testDate = new DateTime('2023-6-10T8:50:00.000Z').setZone("Asia/Kolkata")
const testTwo = DateTime.fromISO(`${get[2]}-${get[0]}-${get[1]}T${get1[0]}:${get1[1]}:${get1[2]}.000Z`)

console.log( DateTime.fromISO(`${get[2]}-${get[0]}-${get[1]}T${get1[0]}:${get1[1]}:${get1[2]}.000Z`).setZone("Asia/Kolkata").ts > new DateTime('2023-6-10T:11:00.000Z').setZone("Asia/Kolkata").ts )

const d = new Date();
// d.setMonth('10'-1)
// d.setFullYear(2023)
// d.setDate(6)
const localTime = d.getTime();

const localOffset = d.getTimezoneOffset() * 60000;
const utc = localTime + localOffset;
const offset = +5.5 // UTC of USA Eastern Time Zone is -05.00
const usa = utc + (3600000 * offset);

const usaTimeNow = new Date(usa).toLocaleString();
console.log(3600000 * 1 );
const offset1 = +5.5; // UTC of USA Eastern Time Zone is -05.00

const usa1 = utc + (3600000 * offset + (eval('0'*3600000) + (eval('0'*60000))));
const usaTimeNow1 = new Date(usa1).toLocaleString();


console.log( new Date(usaTimeNow) > new Date(usaTimeNow1)  )

app.get("/isCheck", (req, res) => {
  if (req.session.isAuth)
   { 
    return res.json({ status: "isLogin" });
  }
  else return res.json({ status: "isLogout" });
});

app.get('/isValueExam',(req,res)=>{
  if (req.session.examID)
   { 
    return res.json({ isValue: true });
  }
  else return res.json({ isValue: false,userID:req.session.userID });
})
app.get("/isLogin", (req, res) => {
  if (req.session.isLogin)
   { 
    if(req.session.examID){
      res.json({ status: "isExam", message:'go to exam',examID:req.session.examID});
    }
    else{ 
      if(req.session.userRoll == 'student')  return res.json({ status: "isLogin" ,roll: req.session.userRoll, id: req.session.userID });
      else if (req.session.userRoll == "teacher" ||
      req.session.userRoll == "admin" ||
      req.session.userRoll == "institution")
      return res.json({ status: "isLogin" ,roll: req.session.userRoll, id: req.session.userID,institutionID:req.session.institutionID !== undefined ? req.session.institutionID : undefined });
     
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


//institution user
app.get('/institution',(req,res)=>{
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
})
app.get('/institution/batch',(req,res)=>{
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
})
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
