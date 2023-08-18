const Institution = require("../../../models/institution");
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