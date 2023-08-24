const Exam = require("../../../models/exam");
const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require("../../../models/questionBank");
const User = require('../../../models/user')
const Course = require('../../../models/course')
const questionCollection = require("../../../models/questionCollection");
const {createPractiesExamQues} =require('../../../util/createQuestion')
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
     const examDate = new Date(details.setDate);

      const exam = await Exam({
        type:type,
        batchID:id,
        title: details.setExamTitle,
        examDate: `${examDate.getDate()}/${eval(examDate.getMonth() + 1)}/${examDate.getFullYear()}`,
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


exports.createPractiesExam = async(req,res,next)=>{
   try {
    console.log(req.body)
    const {id,selectGoal,value} = req.body
  
    const user = await User.findOne({_id:id})
     const Bank = await questionBank.find()
if(user){
  const course = await Course.findOne({_id:selectGoal.courseId}) 
  if(course){
    
    const check = []
    const collectSelectTopic = []
    const questionID =[]
    const finalQuestion = []
      selectGoal.topic.map(task => {
        if(task.isSelect == true ) {
          check.push(task.id.valueOf())
         
          questionID.push({
            title:task.title,
            id : task.id,
            bankID:task.bankID,
            type:task.type,
            easy:[],
            medium:[],
            hard:[],
            requireEasy:0,
            requireMedium:0,
            requireHard:0,
          })
          finalQuestion.push({
            title:task.title,
            id : task.id,
            bankID:task.bankID,
            type:task.type,
            questions:[],     
          })
        }
      })
      course.collections.map(task =>
        task.topic.map(task =>{
             if(check.indexOf(task.id.valueOf()) !== -1) collectSelectTopic.push(task)
        })
      )

if(value.value % check.length  == 0) {
  for(let i=0;i<check.length;i++){
  if(value.selectLevel == 'easy') questionID[i].requireEasy= value.value / check.length
  if(value.selectLevel == 'medium') questionID[i].requireMedium = value.value / check.length
  if(value.selectLevel == 'hard') questionID[i].requireHard = value.value / check.length  
}  
}
else{
  const actuelValue = value.value % check.length

  for(let i=0;i<check.length;i++){
    if(value.selectLevel == 'easy') questionID[i].requireEasy= (value.value - actuelValue) / check.length
    if(value.selectLevel == 'medium') questionID[i].requireMedium = (value.value - actuelValue) / check.length
    if(value.selectLevel == 'hard') questionID[i].requireHard = (value.value - actuelValue) / check.length
  } 
  for(let j=0;j<actuelValue;j++)
  {
    if(value.selectLevel == 'easy') questionID[j].requireEasy= 1 + questionID[j].requireEasy
    if(value.selectLevel == 'medium') questionID[j].requireMedium = 1 + questionID[j].requireMedium
    if(value.selectLevel == 'hard') questionID[j].requireHard = 1 + questionID[j].requireMedium
  }
     
}
/// get questions
   const getBankID = []
   
   questionID.map(task => getBankID.push(task.bankID.valueOf()))
   
   const questions = await createPractiesExamQues(getBankID,questionID,finalQuestion)
   console.log(questions)
  }
 
 }
 } catch (error) {
    console.log(error)
  }
}




function CallGetQuestion() {
  
  questions.map((task, quesIndex) => {
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
}