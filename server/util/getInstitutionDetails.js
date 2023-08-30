const Batch = require("../models/batch.js");
const Institution = require("../models/institution.js");
exports.getInstitutionDetails = async (institutionID, batchs) => {
  try {
    const collectBatch = [];
    const institute = await Institution.findOne({ _id: institutionID });
    for (let i = 0; i < batchs.length; i++) {
      const scheduleTest = [];
      const batch = await Batch.findOne({ institutionID, _id: batchs[i] });

      batch.scheduleTest.map((task) => {
        if (task.status == "pending") scheduleTest.push({ name: task.name, examID: task.examID });
      });

      collectBatch.push({
        batchName: batch.name,
        scheduleTest,
      });      
    }
    return {
        name:institute.name,
        avatar:institute.avatar,
        collectBatch,
    }
  } catch (error) {
    console.log(error);
  }
};
