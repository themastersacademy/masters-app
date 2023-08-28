const exam = require("../../models/exam.js");
const user = require("../../models/user.js");
const questionCollection = require("../../models/questionCollection.js");
const examState = require("../../models/examState.js");
const Goal = require("../../models/goal.js");

exports.getExamInfo = async function (req, res) {
  try {
    const path = req.path;

    const examId = path.split("/")[2];
    const examInfo = await exam.findOne({ _id: examId });
    if (!examInfo) {
      return res.status(404).send("exam not found");
    }
    res.status(200).json({
      title: examInfo.title,
      examDate: examInfo.examDate,
      examDuration: examInfo.examDuration,
      examEndTime: examInfo.examEndTime,
      examStartTime: examInfo.examStartTime,
      type: examInfo.type,
    });
  } catch (error) {
    console.error(error);
  }
};

exports.startExam = async function (req, res) {
  const path = req.path;
  const examID = path.split("/")[2];
  const userID = req.session.userID;
  req.session.examID = examID;
  const userName = req.session.userName

  const State = await examState({ examID, userID });
   //   State.save();
  try {
    const getQuestionCollection = await questionCollection.find();
    const examInfo = await exam.findOne({ _id: examID });
    if (!examInfo) {
      return res.status(404).send("exam not found");
    }
    if (examInfo.type === "schedule") {
      const get = examInfo.studentsPerformance.filter(
        (task) => task.id.valueOf() == userID.valueOf()
      );

      if (get.length === 0) {
        let totalQuestion = 0;
        const isValidExam = await isValidExamStart(examInfo);
        console.log(isValidExam);
        if (isValidExam) {
          const studentAnswerList = [];
          examInfo.questionCategory.forEach((category) => {
            (totalQuestion += category.questionList.length),
              category.questionList.forEach((question) => {
                studentAnswerList.push(null);
              });
          });
          const bookmarkedQuestionList = [];
          examInfo.questionCategory.forEach((category) => {
            category.questionList.forEach((question) => {
              bookmarkedQuestionList.push(false);
            });
          });
          const actualAnswerList = [];
          const getQuestionID = [];
          examInfo.questionCategory.map((task) =>
            task.questionList.map(async (task) => {
              getQuestionID.push(task.id.valueOf());
            })
          );
          getQuestionCollection.map((task, index) => {
            if (getQuestionID.indexOf(task._id.valueOf()) !== -1) {
              task.options.map((option, index) => {
                if (option.isCorrect) actualAnswerList.push(index);
              });
            }
          });
          examInfo.totalQuestion = totalQuestion;
          examInfo.actualAnswerList = actualAnswerList;
          examInfo.studentsPerformance.push({
            id: userID,
            name: userName,
            startTime: Date.now(),
            studentAnswerList,
            bookmarkedQuestionList,
            score: 0,
            mark: 5,
            status: "started",
          });
          await examInfo.save();
          req.session.examID = examInfo._id;
          req.session.examName = examInfo.title;
          return res
            .status(200)
            .json({ message: "exam started", status: "success" });
        } else {
          return res.status(400).json({ message: "exam not started yet" });
        }
      } else {
        return res.status(400).json({ message: "exam already started" });
      }
    }
    if (examInfo.type === "practice" || examInfo.type === "mock") {
      const date = new Date();
      examInfo.examStartTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const duration = examInfo.examDuration;
      const durationArray = duration.split(":");
      const durationSeconds =
        eval(durationArray[0]) * 3600 +
        eval(durationArray[1]) * 60 +
        eval(durationArray[2]);
      const examEndTime = new Date(date.getTime() + durationSeconds * 1000);
      examInfo.examEndTime = `${examEndTime.getHours()}:${examEndTime.getMinutes()}:${examEndTime.getSeconds()}`;
      const get = examInfo.studentsPerformance.filter(
        (task) => task.id.valueOf() == userID.valueOf()
      );

      if (get.length === 0) {
        const studentAnswerList = [];
        console.log(examInfo.questionCategory);
        examInfo.questionCategory.forEach((category) => {
          console.log(category.questionList.length);
          category.questionList.forEach((question) => {
            studentAnswerList.push(null);
          });
        });
        const bookmarkedQuestionList = [];
        examInfo.questionCategory.forEach((category) => {
          category.questionList.forEach((question) => {
            bookmarkedQuestionList.push(false);
          });
        });
        const actualAnswerList = [];
        const getQuestionID = [];
        examInfo.questionCategory.map((task) =>
          task.questionList.map(async (task) => {
            getQuestionID.push(task.id.valueOf());
          })
        );
        getQuestionCollection.map((task, index) => {
          if (getQuestionID.indexOf(task._id.valueOf()) !== -1) {
            task.options.map((option, index) => {
              if (option.isCorrect) actualAnswerList.push(index);
            });
          }
        });
        examInfo.actualAnswerList = actualAnswerList;
        examInfo.studentsPerformance.push({
          id: userID,
          name: userName,
          startTime: Date.now(),
          studentAnswerList,
          bookmarkedQuestionList,
          score: 0,
          mark: 5,
          status: "started",
        });
        await examInfo.save();
        req.session.examID = examInfo._id;
        req.session.examName = examInfo.title;
        return res
          .status(200)
          .json({ message: "exam started", status: "success" });
      } else {
        return res.status(400).json({ message: "exam already started" });
      }
    }
  } catch (error) {
    throw error;
  }
};

const isValidExamStart = async function (examInfo) {
  const currentTime = new Date();
  let examDate = examInfo.examDate.split("/");
  console.log(currentTime < new Date(examDate + " " + examInfo.examEndTime));
  examDate = `${examDate[1]}/${examDate[0]}/${examDate[2]}`;
  return (
    examInfo.examDate ===
      `${currentTime.getDate()}/${
        currentTime.getMonth() + 1
      }/${currentTime.getFullYear()}` &&
    currentTime > new Date(examDate + " " + examInfo.examStartTime) &&
    currentTime < new Date(examDate + " " + examInfo.examEndTime)
  );
};

exports.getExamState = async function (req, res) {
  const userID = req.session.userID;
  const userName = req.session.userName;
  const examId = req.session.examID;

  try {
    const getExam = await exam.findOne({ _id: examId });

   
    const User = await user.findOne({ _id: userID });
    if (getExam && User) {
      const questionCategoryList = [];
      const questionCollections = [];
      const getQuestionID = [];
      

      getExam.questionCategory.map((task) => {
        questionCategoryList.push({
          title: task.title,
          questionListLength: task.questionList.length,
        });
      });
      getExam.questionCategory.map((task) =>
        task.questionList.map(async (task) => {
          getQuestionID.push(task.id);
        })
      );

     
      async function getQuestion(task) {
        const collectQues = await questionCollection.findOne({ _id: task });
        const options = [];
        collectQues.options.map((option, index) => {
          options.push(option.option);
        });
        return {
          question: collectQues.title,
          imageUrl: collectQues.imageUrl,
          type: collectQues.type,
          options
        };
      }
      for(let i = 0; i < getQuestionID.length; i++) {
        console.log(getQuestionID[i])
        const ques = await getQuestion(getQuestionID[i]);
        questionCollections.push(ques);
      }
console.log(questionCollections);
     
      let examDate = getExam.examDate.split("/");
      examDate = `${
        eval(examDate[0]) < 10 ? "0" + eval(examDate[0]) : eval(examDate[0])
      }/${eval(examDate[1]) < 10 ? "0" + examDate[1] : examDate[1]}/${
        examDate[2]
      }`;

      const studentPerform = getExam.studentsPerformance.filter(
        (task) => task.id.valueOf() == User._id.valueOf()
      );

       getExam.save();
    
      if (studentPerform[0].status == "started") {
        const examInfoData = {
          examTitle: getExam.title,
          examDate: getExam.examDate ? getExam.examDate : examDate,
          examStartTime:
            getExam.examStartTime.split(":").length == 3
              ? getExam.examStartTime
              : `${getExam.examStartTime}:00`,
          examEndTime:
            getExam.examEndTime.split(":").length == 3
              ? getExam.examEndTime
              : `${getExam.examEndTime}:00`,
          examDuration:
            getExam.examDuration.split(":").length == 3
              ? getExam.examDuration
              : `${getExam.examDuration}:00`,
          mark: getExam.mark,
          negativeMark: getExam.negativeMark,
          currentTime: Date.now(),
          questionCategoryList,
          questionCollections,
          studentsPerformance: [
            {
              id: userID,
              name: userName,
              startTime: `${getExam.examStartTime}:00`,
              endTime: `${getExam.examEndTime}:00`,
              studentAnswerList: studentPerform[0].studentAnswerList,
              bookmarkedQuestionList: studentPerform[0].bookmarkedQuestionList,
              mark: getExam.mark,
              currentIndex: studentPerform[0].currentIndex,
              negativeMark: getExam.negativeMark,
              totalMark: getExam.totalMark,
              status: getExam.status,
              windowCloseWarning: getExam.windowCloseWarning,
              windowResizedWarning: getExam.windowResizedWarning,
            },
          ],
        };

         return res.json(examInfoData);
      } else {
        if (studentPerform[0].status == "submitted")
          return res.json({
            status: "error",
            message: "exam already submitted",
          });
        if (studentPerform[0].status == "terminated")
          return res.json({ status: "error", message: "exam terminated" });
        if (studentPerform[0].status == "notStarted")
          return res.json({ status: "error", message: "exam not started yet" });
        return res.json({ status: "error", message: "something went wrong" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.examStateUpdate = async (req, res, next) => {
  const userID = req.session.userID;
  const examID = req.session.examID;
  const {
    studentAnswerList,
    bookmarkedQuestionList,
    currentIndex,
    windowCloseWarning,
    windowResizedWarning,
  } = req.body;
  console.log(windowCloseWarning, windowResizedWarning);
  console.log(studentAnswerList);
  console.log(bookmarkedQuestionList);
  try {
    const User = await user.findOne({ _id: userID });
    const examState = await exam.findOne({ _id: examID });
   
    if (User) {
      if (examState) {
        // if (windowCloseWarning >= 3 || windowResizedWarning >= 3) {
        examState.studentsPerformance.map((task) => {
          if (User._id.valueOf() == task.id.valueOf()) {
            task.currentIndex = currentIndex;
            task.studentAnswerList = studentAnswerList;
            task.bookmarkedQuestionList = bookmarkedQuestionList;
            // task.windowCloseWarning = windowCloseWarning;
            // task.windowResizedWarning = windowResizedWarning;
            // task.status = status;
          }
        });
        examState.save();
        res.json({
          status: "success",
          message: "Update exam state successfully",
        });
      }
      // else {
      //   examState.studentsPerformance.map((task) => {
      //     if (User._id.valueOf() == task.id.valueOf()) {
      //       task.status = "terminated";
      //     }
      // });
      // examState.save();
      // }
      // }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.submitExam = async (req, res, next) => {
  try {
    const userID = req.session.userID;
    const examID = req.session.examID;
    const date = new Date();
    if (examID) {
      
      const examInfo = await exam.findOne({ _id: examID });

      if (examInfo.type == "practice" || examInfo.type == "mock") {
 

        const get = examInfo.studentsPerformance.filter(
          (task) => task.id.valueOf() == userID.valueOf()
        );
        if (get.length !== 0) {
          let totalQuestion = 0;
          examInfo.questionCategory.map((task) => {
            totalQuestion += task.questionList.length;
          });

          const studentAnswerList = get[0].studentAnswerList;
          const actualAnswerList = examInfo.actualAnswerList;
          const mark = examInfo.mark;
          let studentNegativeMark = 0;
          const negativeMark = examInfo.negativeMark;
          const totalMark = mark * totalQuestion;

          let actualCorrectAttend = 0;
          let actualWrongAttend = 0;
          let score = 0;
          let questionAttempted = 0;
          actualAnswerList.map((task, index) => {
            if (actualAnswerList[index] == studentAnswerList[index]) {
              score += mark;
              actualCorrectAttend += 1;
              questionAttempted += 1;
            } else if (studentAnswerList[index] !== null) {
              studentNegativeMark += negativeMark;
              actualWrongAttend += 1;
              questionAttempted += 1;
            }
          });

          get[0].totalMark = totalMark;
          get[0].questionAttempted = questionAttempted;
          get[0].correctedAnswerList = actualAnswerList;
          get[0].mark = score;
          get[0].negativeMark = studentNegativeMark;
          get[0].status = "submitted";
          const questionCategoryList = [];
          examInfo.questionCategory.map((task) =>
            questionCategoryList.push({
              title: task.title,
              questionListLength: task.questionList.length,
            })
          );
          const goal = await Goal.findOne({
            courseId: examInfo.courseId,
            userId: userID,
          });
        
          if (goal) {
            console.log(goal)
            const questionCategoryList = [];
            examInfo.questionCategory.map((task) =>
              questionCategoryList.push({
                title: task.title,
                questionListLength: task.questionList.length,
              })
            );
            const topics = [];
            let countLength = 0;
            questionCategoryList.map((task, index) => {
                
              let actualAnswerList = examInfo.actualAnswerList;
              let studentAnswerList = get[0].studentAnswerList;
              let correctQuestion = 0;
              let wrongQuestion = 0;
              let totalQuestion = task.questionListLength;
              if (index == 0) {
                actualAnswerList = actualAnswerList.slice(
                  0,
                  task.questionListLength
                );
                studentAnswerList = studentAnswerList.slice(
                  0,
                  task.questionListLength
                );
                countLength = task.questionListLength;
              } else {
                actualAnswerList = actualAnswerList.slice(
                  countLength,
                  countLength + task.questionListLength
                );
                studentAnswerList = studentAnswerList.slice(
                  countLength,
                  countLength + task.questionListLength
                );
                countLength += task.questionListLength;
              }
              actualAnswerList.map((task, index) => {
                if (actualAnswerList[index] == studentAnswerList[index]) {
                  correctQuestion += 1;
                } else if (studentAnswerList[index] !== null) {
                  wrongQuestion += 1;
                }
              }),
                
            
              topics.push({
                topicName: task.title,
                totalQuestion,
                correctQuestion,
                wrongQuestion,
                accuracy: (correctQuestion / totalQuestion) * 100,
              });
             
            });
            const examTopic = [];
            topics.map((task) => {
              examTopic.push({
                topicName: task.topicName,
                accuracy: task.accuracy,
              });
              goal.topics.map((task1) => {
             
               
                if (task.topicName == task1.topicName) {
                  
                  task1.questionAttempted +=
                    task.correctQuestion + task.wrongQuestion;
                  task1.questionTotal += task.totalQuestion;
                  task1.questionCorrect += task.correctQuestion;
                  task1.questionSkipped +=
                    task.totalQuestion -
                    (task.correctQuestion + task.wrongQuestion);
                  task1.questionWrong += task.wrongQuestion;
                  task1.accuracy =
                    (task1.questionCorrect / task1.questionTotal) * 100;
                   
                }
              });
            });
          


            get[0].topics = examTopic;
            
            examInfo.studentsPerformance.map((task) => {
              if (task.id.valueOf() == userID.valueOf()) {
                task = get[0];
              }
            });
            goal.examHistory.push({
              examId: examID,
              type: examInfo.type,
              examName: examInfo.title,
              totalMarks: totalMark,
              score,
              date: `${date.getDate()}/${
                date.getMonth() + 1
              }/${date.getFullYear()}`,
              topics,
            });
            goal.save();
            examInfo.save();
            const state = await examState.deleteOne({ examID, userID });
          
            delete req.session.examID;
            res.json({
              status: "success",
              message: "exam submitted successfully",
            });
          }
        }
      } else if (examInfo.type == "schedule") {
        const get = examInfo.studentsPerformance.filter(
          (task) => task.id.valueOf() == userID.valueOf()
        );

        if (get.length !== 0) {
          let totalQuestion = 0;
          examInfo.questionCategory.map((task) => {
            totalQuestion += task.questionList.length;
          });
          const studentAnswerList = get[0].studentAnswerList;

          const actualAnswerList = examInfo.actualAnswerList;
          const mark = examInfo.mark;
          let studentNegativeMark = 0;
          const negativeMark = examInfo.negativeMark;
          const totalMark = mark * totalQuestion;

          let actualCorrectAttend = 0;
          let actualWrongAttend = 0;
          let score = 0;
          let questionAttempted = 0;
          actualAnswerList.map((task, index) => {
            if (actualAnswerList[index] == studentAnswerList[index]) {
              score += mark;
              questionAttempted += 1;
              actualCorrectAttend += 1;
            } else if (studentAnswerList[index] !== null) {
              studentNegativeMark += negativeMark;
              actualWrongAttend += 1;
              questionAttempted += 1;
            }
          });
          get[0].totalMark = totalMark;
          get[0].questionAttempted = questionAttempted;
          get[0].correctedAnswerList = actualAnswerList;
          get[0].mark = score;
          get[0].negativeMark = studentNegativeMark;
          get[0].status = "submitted";
          const questionCategoryList = [];
          examInfo.questionCategory.map((task) =>
            questionCategoryList.push({
              title: task.title,
              questionListLength: task.questionList.length,
            })
          );
          const topics = [];
          let countLength = 0;
          questionCategoryList.map((task, index) => {
            let actualAnswerList = examInfo.actualAnswerList;
            let studentAnswerList = get[0].studentAnswerList;
            let correctQuestion = 0;
            let wrongQuestion = 0;
            let totalQuestion = task.questionListLength;
            if (index == 0) {
              actualAnswerList = actualAnswerList.slice(
                0,
                task.questionListLength
              );
              studentAnswerList = studentAnswerList.slice(
                0,
                task.questionListLength
              );
              countLength = task.questionListLength;
            } else {
              actualAnswerList = actualAnswerList.slice(
                countLength,
                countLength + task.questionListLength
              );
              studentAnswerList = studentAnswerList.slice(
                countLength,
                countLength + task.questionListLength
              );
              countLength += task.questionListLength;
            }
            actualAnswerList.map((task, index) => {
              if (actualAnswerList[index] == studentAnswerList[index]) {
                correctQuestion += 1;
              } else if (studentAnswerList[index] !== null) {
                wrongQuestion += 1;
              }
            }),
              console.log(correctQuestion, wrongQuestion, totalQuestion);
            topics.push({
              topicName: task.title,
              accuracy: (correctQuestion / totalQuestion) * 100,
            });
          });

          get[0].topics = topics;
          examInfo.studentsPerformance.map((task) => {
            if (task.id.valueOf() == userID.valueOf()) {
              task = get[0];
            }
          });
          examInfo.save();
          const state = await examState.deleteOne({ examID, userID });
          delete req.session.examID;
          res.json({
            status: "success",
            message: "exam submitted successfully",
          });
        }
      } else {
        res.json({
          status: "success",
          message: "something went wrong",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getExamResult = async (req, res, next) => {
  try {
    const path = req.path;
    const examID = path.split("/")[2];
    console.log(examID);
    const userID = req.session.userID;

    const examInfo = await exam.findOne({ _id: examID });
    if (examInfo) {
      const get = examInfo.studentsPerformance.filter(
        (task) => task.id.valueOf() == userID.valueOf()
      );
      if (get.length !== 0) {
        const examResult = {
          mark: get[0].mark - get[0].negativeMark,
          topics: get[0].topics,
          totalMarks: examInfo.mark * examInfo.actualAnswerList.length,
          questionAttempted: get[0].questionAttempted,
          totalQuestion: examInfo.actualAnswerList.length,
          questionUnAttempted:
            examInfo.actualAnswerList.length - get[0].questionAttempted,
        };
        res.json(examResult);
      }
    } else {
      return res.status(404).send("exam not found");
    }
  } catch (error) {
    console.log(error);
  }
};
