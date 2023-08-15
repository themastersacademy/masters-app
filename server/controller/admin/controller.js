const User = require('../../models/user')
exports.getInstitutions  = async (req,res,next) =>{
const institute = await User.find()
if(institute){
    
  const list = await institute.filter(task => task.type == 'institution' )
  if(list) res.json({status:'success',message:list})
}
}