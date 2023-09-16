const course = require("../../models/course");
const Goal = require("../../models/goal");

exports.getGoalAnalysis = async(courseID,userID) =>{

try {
    const get = await course.findOne({_id:courseID}) 
   const getUserGoal = await Goal.findOne({
    courseId: courseID,
    userId: userID,
  })
  
      const getTopicID = [];
      const createTopic = [];
      const studentsPerformance = [];

      // get course collection topicID
      get.collections.map((task) => getTopicID.push(task.topicID));

     
        getUserGoal.topics.map((task) => {
          if (getTopicID.indexOf(task.topicID) !== -1) {
            createTopic.push(task.topicID);
          }
        });
   

      //create new topic in goal
      const getCheck = [];
      get.collections.map((task) => {
        if (
          createTopic.indexOf(task.topicID) == -1 &&
          getCheck.indexOf(task.topicID) == -1
        ) {
          const getID = [];

          task.topic.map((task) => getID.push(task.id));
          getUserGoal.topics.push({
            type: task.type,
            topicName: task.type == "group" ? task.title : task.topic[0].title,
            topicID: task.topicID,
            bankID: getID,
          });
          getCheck.push(task.topicID);
        }
      });
      const topicName = [];
      const topicAnalysis = [];

        getUserGoal.topics.map((task) => {
          if (getTopicID.indexOf(task.topicID) !== -1) {
            createTopic.push(task.topicID);
            topicName.push(task.topicName);
            topicAnalysis.push(task.accuracy);
          }
        });

        
          studentsPerformance.push({
            Analysis: {
              topicName,
              topicAnalysis,
            },
          });

  
      getUserGoal.save()

      return studentsPerformance

} catch (error) {
    
}
 
}