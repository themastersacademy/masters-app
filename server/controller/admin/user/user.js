
const User = require('../../../models/user')

const Institution = require('../../../models/institution')
exports.getUser = async (req,res,next) =>{
 const user = await User.find()
 if(user) res.json({status:'succes',message:user})
}

exports.changeRoll = async (req,res,next) =>{
  const id = req.body.list.id
  const email = req.body.list.email
  const name = req.body.list.name
  const user = await User.findOne({_id:id})
  if(user)
  {
    user.name = name
    user.type = 'institution'
   
   const institution = await Institution({name:name,id:id,avatar:user.avatar})
   institution.save()
   user.institutionID = institution._id
   user.save()
 
    res.json({status:'success',message:'Change details successfully'})
  }
  else res.json({status:'error',message:'something wrong'})
 }