const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require('../../../models/questionBank')
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


exports.createBatechTopic = async (req,res,next) =>{
  console.log(req.body)

  try {
    const batch = await Batch.findOne({_id:req.body.id})
  const bank = await questionBank.find()
    if(batch){
      res.json({status:'success',message:bank})
    //   const check =[]
    //   const send =[]
    //   if(batch.scheduleTest.length > 0) batch.scheduleTest.map(task => check.push(task.quesID.valueOf()))
      
    //   bank.map(task => {
    //  if(check.indexOf(task._id.valueOf()) == -1){ console.log(task)
    //    send.push(task)}
    //   })
    //   res.json({status:'success',message:send})
    }
    else  res.json({status:'error',message:'Something wrong'})

  } catch (error) {
    console.log(error)
    res.json({status:'error',message:'Something wrong'})
  }
 
 
 
}

exports.selectBatchTopic = async(req,res,next) =>{
try {
  const batch = await Batch.findOne({_id:req.body.id})
  if(batch){
    batch.scheduleTest.push({quesID:req.body.topic._id,title:req.body.topic.title})
    batch.save()
    res.json({status:'success',message:'Create topic successfully'})
  }
} catch (error) {
  console.log(error)
}
}

exports.getBatchTopic =async (req,res,next) =>{
  try {
    const batch = await Batch.findOne({_id:req.body.id})
    const bank = await questionBank.find()

    if(batch){
      const check =[]
      const details ={
        setDate:batch.setDate,
        setTimeFrom:batch.setTimeFrom,
        setTimeTo:batch.setTimeTo,
        setMark:batch.setMark,
        setNegativeMark:batch.setNegativeMark
      }
      if(batch.scheduleTest.length > 0) batch.scheduleTest.map(task => check.push(task.quesID.valueOf()))
      const avalibleQues = bank.filter(task => check.indexOf(task._id.valueOf()) !== -1 )
      const batchQues = batch.scheduleTest
      
      res.json({status:'ok',avalibleQues:avalibleQues,batchQues:batchQues,details:details})
    }
  } catch (error) {
    console.log(error)
  }
}

exports.saveChangeBatch =async(req,res,next)=>{
  try {
    const batch = await Batch.findOne({_id:req.body.id})
    batch.scheduleTest = req.body.data
    batch.save()
    res.json({status:'success',message:'save change successfully'})
  } catch (error) {
    console.log(error)
  }


}