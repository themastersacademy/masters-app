const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require('../../../models/questionBank')
exports.deleteBatchTopic = async(req,res,next) =>{
    try {
        const batch = await Batch.findOne({_id:req.body.id})
        if(batch){
            const get = batch.scheduleTest.filter(task => task.quesID.valueOf() !== req.body.deleteID.valueOf())
           
          
            batch.scheduleTest = get
            batch.save()
            res.json({status:'success',message:'Topic delete successfully'})
        }
    } catch (error) {
        throw error
    }


}