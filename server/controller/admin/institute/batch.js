const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const crypto = require("crypto");
exports.createBatch = async (req, res, next) => {
  const id = req.body.id;
  const batchName = req.body.batchName;
  
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
};
