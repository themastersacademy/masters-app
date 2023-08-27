

const Collections = require('../models/questionCollection')
exports.createPracticeExamQues = async (bankID,collectQuestion,finalQuestion) => {
try {
    
     const collection = await Collections.find()
  
  
   const getCollection = collection.filter(task => bankID.indexOf(task.QuesbankID.valueOf()) !== -1)
   getCollection.map(task => {
    if(bankID.indexOf(task.QuesbankID.valueOf()) !== -1){
        if(task.level == 'Easy')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].easy.push(task._id)
        if(task.level == 'Medium')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].medium.push(task._id)
        if(task.level == 'Hard')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].hard.push(task._id)
    }
   })
   collectQuestion.map((task,quesIndex) => {
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
            finalQuestion[quesIndex].questions.push({id:task.easy[random]});
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
            finalQuestion[quesIndex].questions.push({id:task.medium[random]});
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
            finalQuestion[quesIndex].questions.push({id:task.hard[random]});
            index.push(random);
            i++;
          } else {
            console.log("match Hard", random);
          }
        }
      }
   })
 return finalQuestion
} catch (error) {
    console.log(error)
}
}





exports.createMockExamQues = async (bankID,collectQuestion,finalQuestion) => {
try {
    
     const collection = await Collections.find()
  
   const getCollection = collection.filter(task => bankID.indexOf(task.QuesbankID.valueOf()) !== -1)
   getCollection.map(task => {
    if(bankID.indexOf(task.QuesbankID.valueOf()) !== -1){
        if(task.level == 'Easy')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].easy.push(task._id)
        if(task.level == 'Medium')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].medium.push(task._id)
        if(task.level == 'Hard')  collectQuestion[bankID.indexOf(task.QuesbankID.valueOf())].hard.push(task._id)
    }
   })
   collectQuestion.map((task,quesIndex) => {
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
            finalQuestion[quesIndex].questions.push({id:task.easy[random]});
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
            finalQuestion[quesIndex].questions.push({id:task.medium[random]});
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
            finalQuestion[quesIndex].questions.push({id:task.hard[random]});
            index.push(random);
            i++;
          } else {
            console.log("match Hard", random);
          }
        }
      }
   })
 return finalQuestion
} catch (error) {
    console.log(error)
}
}