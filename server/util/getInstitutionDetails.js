const Batch = require("../models/batch.js");
const Institution = require("../models/institution.js");
const {currentTime,examEndTime} = require('./time.js')
exports.getInstitutionDetails = async (institutionID, batchs) => {
  try {
    const collectBatch = [];
    const institute = await Institution.findOne({ _id: institutionID });
    for (let i = 0; i < batchs.length; i++) {
      const scheduleTest = [];
      const batch = await Batch.findOne({ institutionID, _id: batchs[i] });

      for(let i=0 ;i<batch.scheduleTest.length ;i++){
      const isValue = await isValidExamEnd(batch.scheduleTest[i]);
      if (batch.scheduleTest[i].status == "pending" && !isValue) scheduleTest.push({ name: batch.scheduleTest[i].name, examID: batch.scheduleTest[i].examID });
      }
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

const isValidExamEnd = async function (examInfo) {
  let date = new Date();
  let indianTime = date.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });

  // const currentTime = indianTime;

  let examDate = examInfo.examDate.split("/");
  examDate = `${examDate[1]}/${examDate[0]}/${examDate[2]}`;

  let examEnd = new Date(examDate + " " + `${examInfo.examEndTime}:00`);
  examEnd.setHours(examEnd.getHours()+2)
  examEnd.setMinutes(examEnd.getMinutes()+30)
  let indianTimeEnd = examEnd.toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour12: false,
  });
  const current = currentTime()
  const endTime = examEndTime(examInfo.examDate,examInfo.examEndTime)
  return current > endTime
 // return currentTime > indianTimeEnd;
};