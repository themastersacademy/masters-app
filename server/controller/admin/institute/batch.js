const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require('../../../models/questionBank')
const User =  require('../../../models/user')
const crypto = require("crypto");
exports.createBatch = async (req, res, next) => {
  const id = req.body.id;
  const batchName = req.body.batchName;
  try {
    
  
  const institute = await institution.findOne({ _id: id });
  if (institute) {
    const check = []
    if( institute.batch.length > 0)   institute.batch.map(task => check.push(task.name))
  console.log(check)
    if (check.indexOf(batchName) == -1) {
      
      const batchCode = crypto.randomBytes(5).toString("hex");
      const createBatch = await Batch({
        name: batchName,
        institutionID: id,
        batchCode: `#${batchCode}`,
      });
      if (createBatch) {
            createBatch.save();
            institute.batch.push({ name: batchName, batchID: createBatch._id });
            institute.updatedAt = Date()
            try {
            institute.save();
        } catch (error) {
            console.log(error)
        }
      }
      res.json({status:'success',message:'The batch create successfully'})
    }
    else res.json({status:'error',message:'The batch name already exists'})
  }
} catch (error) {
    console.log(error)
    res.json({status:'error',message:'Something wrong'})
}
};


exports.getBatechTopic = async (req,res,next) =>{
  console.log(req.body)

  try {
    const batch = await Batch.findOne({_id:req.body.id})
  const bank = await questionBank.find()
    if(batch){
      res.json({status:'success',message:bank})

    }
    else  res.json({status:'error',message:'Something wrong'})

  } catch (error) {
    console.log(error)
    res.json({status:'error',message:'Something wrong'})
  }
 
}


exports.getHistory =async (req,res,next) =>{
  try {
    const batch = await Batch.findOne({_id:req.body.id})
    if(batch){
      const institute = await institution.findOne({_id:batch.institutionID})
      
      const details = {
        avatar:institute.avatar,
        name:institute.name,
        batchName:batch.name,
        batchCode:batch.batchCode
      }
      
      res.json({status:'ok',message:batch,head:details})
    }
  } catch (error) {
    console.log(error)
  }

}


exports.getRequestAccess = async(req,res,next) =>{
  const {id,status,data} = req.body

  try {
     const user = await User.findOne({_id:data.userID})
    const batch = await Batch.findOne({_id:id})
    if(batch){
    if(status == 'ok'){
     batch.studentList.map((task)=>{
         if(task.userID == data.userID) task.request = true
     })
     batch.save()
  user.batchID.push(batch._id)
  user.save()
 
     res.json({status:'success',message:'resquest accept successfully'})
    }
  else if(status == 'not ok' ){
    const get = batch.studentList.filter((task)=> task.userID.valueOf() !== data.userID.valueOf())
    batch.studentList = get
    batch.save()
    res.json({status:'success',message:'Cancle request successfully'})
  }
  else if(status == 'remove' ){
    const get = batch.studendList.filter((task)=> task.userID.valueOf() !== data.userID.valueOf())
    batch.studentList = get
    batch.save()
    const getBatchID =  user.batchID.filter(task => task.valueOf() !== batch._id.valueOf())
    user.batchID = getBatchID
    user.save()
    res.json({status:'success',message:'Remaove student successfully'})
  }
    }
  } catch (error) {
    res.json({status:'error',message:'something wrong'})
  }
 
}
