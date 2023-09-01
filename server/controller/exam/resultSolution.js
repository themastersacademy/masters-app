const Exam = require('../../models/exam')
const User = require('../../models/user')
const questionCollection = require('../../models/questionCollection')
exports.solution = async (req,res,next) =>{
try {   
const path = req.path;
const userID = req.session.userID;
const examID = path.split("/")[2];
const examInfo = await Exam.findOne({_id:examID})
if(examInfo) {
   const getQuestionID = []
   const questions = []
   examInfo.questionCategory.map(task => task.questionList.map(task =>  getQuestionID.push(task.id)))
      for(let i = 0; i < getQuestionID.length; i++) {
       
        const ques = await getQuestion(getQuestionID[i]);
        questions.push(ques);
      }
      const student = examInfo.studentsPerformance.filter(task =>  task.id.valueOf() == userID.valueOf() )
    
      res.json({
        studentAns:student[0].studentAnswerList,
        actualAns:student[0].correctedAnswerList,
        questions,
        mark:student[0].mark,
        totalMark:student[0].totalMark,
      })
}
} catch (error) {
    console.log(error)
}
}

async function getQuestion(task) {
    const collectQues = await questionCollection.findOne({ _id: task });
    const options = [];
    collectQues.options.map((option, index) => {
      options.push(option.option);
    });
    return {
      question: collectQues.title,
      imageUrl: collectQues.imageUrl,
      expalanationImage:collectQues.explanatinImageUrl,
      type: collectQues.type,
      explanation:collectQues.explanation,
      options
    };
  }