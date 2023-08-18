const Exam = require("../../../models/exam");
const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require("../../../models/questionBank");
const questionCollection = require("../../../models/questionCollection");
exports.createScheduleExam = async (req, res, next) => {
  const questionID = [];
  const finalQues = [];
  const indexValue = [];
  const id = req.body.id
  const details = req.body.details
  const type =req.body.type
  try {
    const batch = await Batch.findOne({ _id: id });
    const Collection = await questionCollection.find();
    if (batch) {
      req.body.data.map((task) => {
        indexValue.push(task._id);
        questionID.push({
          title: task.title,
          id: task._id,
          requireEasy: task.level.easy,
          requireMedium: task.level.medium,
          requireHard: task.level.hard,
          easy: [],
          medium: [],
          hard: [],
        });
        finalQues.push({
          title: task.title,
          id: task._id,
          easy: [],
          medium: [],
          hard: [],
        });
      });

      console.log(questionID);
      Collection.map((task) => {
        if (indexValue.indexOf(task.QuesbankID.valueOf()) !== -1) {
          const index = indexValue.indexOf(task.QuesbankID.valueOf());
          console.log(task);
          if ("Easy" == task.level) questionID[index].easy.push(task._id);
          if ("Medium" == task.level) questionID[index].medium.push(task._id);
          if ("Hard" == task.level) questionID[index].hard.push(task._id);
        }
      });

      questionID.map((task, quesIndex) => {
        if (task.easy.length > 0 || task.requireEasy > 0) {
          const index = [];
          for (let i = 0; i < task.requireEasy; ) {
            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const random = getRandomInt(0, task.requireEasy - 1);

            if (index.indexOf(random) == -1) {
              console.log("not match ", random);
              finalQues[quesIndex].easy.push(task.easy[random]);
              index.push(random);
              i++;
            } else {
              console.log("match easy", random);
            }
          }
        }
        if (task.medium.length > 0 || task.requireMedium > 0) {
          const index = [];
          for (let i = 0; i < task.requireMedium; ) {
            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const random = getRandomInt(0, task.requireMedium - 1);

            if (index.indexOf(random) == -1) {
              console.log("not match ", random);
              finalQues[quesIndex].medium.push(task.medium[random]);
              index.push(random);
              i++;
            } else {
              console.log("match Medium", random);
            }
          }
        }
        if (task.hard.length > 0 || task.requireHard > 0) {
          const index = [];
          for (let i = 0; i < task.requireHard; ) {
            function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            const random = getRandomInt(0, task.requireHard - 1);

            if (index.indexOf(random) == -1) {
              console.log("not match ", random);
              finalQues[quesIndex].hard.push(task.hard[random]);
              index.push(random);
              i++;
            } else {
              console.log("match Hard", random);
            }
          }
        }
      });

 
  const questionCategory =[] 
     finalQues.map((task,index) => {
        const list = []
                 if(task.easy) task.easy.map(easy => list.push({id:easy}))
                 if(task.medium) task.medium.map(medium => list.push({id:medium}))
                 if(task.hard) task.hard.map(hard => list.push({id:hard}))

                 questionCategory.push({title:task.title,id:task.id,questionList:list})
     })
console.log(questionCategory)
      const exam = await Exam({
        type:type,
        batchID:id,
        title: details.setExamTitle,
        examDate: details.setDate,
        examStartTime: details.setTimeFrom,
        examEndTime: details.setTimeTo,
        examDuration: details.examDuration,
        mark: details.setMark,
        negativeMark: details.setNegativeMark,
        questionCategory:questionCategory
      });
      exam.save()

      batch.scheduleTest.push({name:details.setExamTitle,examID:exam._id})
      batch.save()
      res.json({status:'success',message:'Create schedule text successfully'})
    }


  } catch (error) {
    console.log(error);
  }
};
