const User = require('../models/user')
const Goal = require('../models/goal')
const Institution = require('../models/institution')
const Batch = require('../models/batch')
const Exam = require('../models/exam')
const Instityution = require('../models/institution')
exports.clearAvatarAndHistory =  async (req,res)=>{
    try {
        const user = await User.find()
        if(user){
            for(let i=0;i<user.length;i++){
                if(user[i].type !== 'institution') user[i].avatar = ''
                else if(user[i].type == 'institution') user[i].avatar = 'institutionImage'
                user[i].batchID = []
                if(user[i].type =='student' && user[i].type =='teacher' ) {
                     user[i].institutionID = undefined
                }
                if(user[i].goal.length > 0){
                    for(let j=0;j<user[i].goal.length;j++)
                    {
                        await clearGoalHistory(user[i].goal[j])
                    }
                }
                user[i].save()
            }
      const batch = await Batch.find()
      if(batch.length > 0){
        for(let i=0;i<batch.length;i++){
            batch[i].studentList  = []
            batch[i].scheduleTest = []
            batch[i].save()
        }
      }

     const institution = await Instityution.find()
     if(institution){
        for(let i=0;i<institution.length;i++){
            institution[i].teacherList=[]
            institution[i].save()
        }
     }

    // const exam = await Exam.find()
    // console.log(exam[exam.length-1]);
    // const date1 = new Date();
    // let indianTime = date1.toLocaleString("en-US", {
    //   timeZone: "Asia/Kolkata",
    //   hour12: false,
    // });
    // console.log(indianTime);
            res.send('success')
         }
    } catch (error) {
        throw error
    }
}

async function clearGoalHistory (id){
    try {
        const goal = await Goal.findOne({_id:id})
        if(goal){
            goal.examHistory = []
            goal.mockCount = 0
            goal.practicesCount = 0
            goal.save()
        }
    } catch (error) {
        throw error
    }
}