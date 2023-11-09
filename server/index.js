//Imports
const express = require("express");
const route = require("./router/route.js");
const paymentRouter = require('./paymentRoute/route.js')
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
  verifyGoal,
 payStatus
} = require("./auth/auth.js");
const connectDB = require("./util/connectDB.js");
const { invoiceEmail } = require("./controller/email/invoiceEmail.js");
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
app.use('/payment',paymentRouter)
app.use(cors())
//Application Route

// application

// app.get('/pdf',(req,res)=>{
//   invoiceEmail('muthu17don@gmail.com')
//   res.send('send')
// })

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
    if(req.session.checkPage) return res.json({ status : req.session.checkPage });
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


//Payment 
app.get("/handleStatus",userVerify,(req, res) => {
  if(req.session.isAuth) {
    delete req.session.plan
    delete req.session.courseName;
    delete req.session.payStatus;
    delete req.session.planMonth;
    delete req.session.amount;
    delete req.session.discount;
    delete req.session.totalAmount
    delete req.session.validDay
    delete req.session.validMonth
    delete req.session.validYear
    delete req.session.payStatus
    delete req.session.paymentID

   return res.json({status:'success'})
  }
   else  res.json({status:'failed'}) 
});
app.get("/payMent",userVerify,(req,res)=>{
  try {
    if(req.session.payStatus) return res.json({status:true})
    else return res.json({status:false})
   } catch (error) {
     throw error
   }
})


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

//payment Pages

app.get('/checkout',userVerify,(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})
app.get('/plan',userVerify,(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})


// Payment Status
app.get('/success',userVerify,(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})

app.get('/failure',userVerify,(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})



// Error Page

app.get('/error',(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})


//Policy
app.get('/policy',(req,res) => {
  res.sendFile(path.join(__dirname, "../client/build","index.html"))
})




// Static Files
app.use("/", express.static(path.join(__dirname, "../client/build")));
app.use("/", express.static(path.join(__dirname, "../invoice")));

app.use((err, req, res, next) => {

  const status = err.status || 500;
  const message = "Something went wrong";
  const data = err.data || null;
//   res.status(status).json({
//     statue: 500,
//     type: "error",
//     message,
//     data,
// });
 res.redirect('/error')
});



app.use((req, res, next) => {
  res.redirect('/error')
})

//Server
app.listen(1338, () => {
  console.log(`Server start at port : ${process.env.PORT}`);
});

