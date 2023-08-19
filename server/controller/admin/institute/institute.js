const Institution = require("../../../models/institution");
const User = require('../../../models/user')
exports.getInstitution = async (req, res, next) => {
  const institute = await Institution.findOne({ _id: req.body.id });
  if (institute) res.json({ status: "success", message: institute });
  else res.json({ status: "error", message: "something wrong" });
};

exports.getInstituteName = async (req,res,next) =>{
  try {
    const data =[]
    const institute = await Institution.find()
    if(institute){
      institute.map(task => data.push({label:task.name,id:task._id}))
      
     res.json({status:'ok',message:data})
    }
  } catch (error) {
    
  }
 
}

exports.getTeacher = async(req,res,next) =>{

  try {
   const user = await User.find()
   if(user)
   {
    const send =[]
    user.map(task => send.push({label:task.email,id:task._id}))
    res.json({status:'ok',message:send})
   }
       
  } catch (error) {
    
  }
}

exports.createTeacher = async (req,res,next) =>{
  const {id,teacherName} = req.body
  try {
    const institute = await Institution.findOne({_id:id})
    if(institute){
      const user = await User.findOne({_id:teacherName.id})
      if(user){
        const check =[]
        institute.teacherList.map(task => {
          if(user._id.valueOf() == task.id.valueOf()) check.push(task)
        })
      if(check.length == 0){
        institute.teacherList.push({name:user.name,id:user._id})
        institute.save()
        user.institutionID = institute._id
        user.type = 'teacher'
        user.save()
        res.json({status:'success',message:'Add teacher successfully'})
      }
      else res.json({status:'already',message:'The teacher name is already exists'})
      } else res.json({status:'error',message:'something wrong'})
    }else res.json({status:'error',message:'something wrong'})
   
  } catch (error) {
    console.log(error)
     res.json({status:'error',message:'something wrong'})
  }
}