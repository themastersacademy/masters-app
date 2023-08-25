const exam = require("../../models/exam.js");
const user = require("../../models/user.js");
const questionCollection = require("../../models/questionCollection.js");
const examState = require("../../models/examState.js");

exports.getExamInfo = async function (req, res) {
  try {
    const path = req.path;
    console.log(path);
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
  console.log(examID);
  const State = await examState({examID,userID});
  State.save()
  try {
    const examInfo = await exam.findOne({ _id: examID });
    if (!examInfo) {
      return res.status(404).send("exam not found");
    }
    if (examInfo.type === "schedule") {
     

      const get = examInfo.studentsPerformance.filter(
        (task) => task.id.valueOf() == userID.valueOf()
      );

      if (get.length === 0) {
        const isValidExam = await isValidExamStart(examInfo);
        if (isValidExam) {
          const studentAnswerList = [];
          examInfo.questionCategory.forEach((category) => {
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
          // examInfo.examEndTime  =
          console.log(studentAnswerList, bookmarkedQuestionList);
          examInfo.studentsPerformance.push({
            id: userID,
            name: "Avinash",
            startTime: Date.now(),
            studentAnswerList,
            bookmarkedQuestionList,
            score: 0,
            mark: 5,
          });
          await examInfo.save();
          req.session.examID = examInfo._id;
          req.session.examName = examInfo.title;
        } else {
          return res.status(400).json({ message: "exam not started yet" });
        }
      } else {
        return res.status(400).json({ message: "exam already started" });
      }
    }
    if (examInfo.type === "practice") {
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
        examInfo.questionCategory.forEach((category) => {
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
        console.log(studentAnswerList, bookmarkedQuestionList);
        examInfo.studentsPerformance.push({
          id: userID,
          name: "Avinash",
          startTime: Date.now(),
          studentAnswerList,
          bookmarkedQuestionList,
          score: 0,
          mark: 5,
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

  examDate = `${examDate[1]}/${examDate[0]}/${examDate[2]}`;
  return (
    examInfo.examDate ===
      `${
        eval(currentTime.getDate()) < 10
          ? "0" + currentTime.getDate()
          : currentTime.getDate()
      }/${
        eval(currentTime.getMonth() + 1) < 10
          ? "0" + eval(currentTime.getMonth() + 1)
          : eval(currentTime.getMonth() + 1)
      }/${currentTime.getFullYear()}` &&
    currentTime > new Date(examDate + " " + examInfo.examStartTime) &&
    currentTime < new Date(examDate + " " + examInfo.examEndTime)
  );
};

exports.getExamState = async function (req, res) {
  const path = req.path;
  const userID = req.session.userID;
  const userName = req.session.userName;
  const examId = req.session.examID;
  
  try {
    const getExam = await exam.findOne({ _id: examId });
    const getQuestionCollection = await questionCollection.find();
    const User = await user.findOne({ _id:userID });
    if (getExam && User) {
      const questionCategoryList = [];
      const questionCollections = [];
      const getQuestionID = [];
      getExam.questionCategory.map((task) =>
        questionCategoryList.push({
          title: task.title,
          questionListLength: task.questionList.length,
        })
      );
      getExam.questionCategory.map((task) =>
        task.questionList.map(async (task) => {
          getQuestionID.push(task.id.valueOf());
        })
      );
      getQuestionCollection.map((task) => {
        if (getQuestionID.indexOf(task._id.valueOf()) !== -1) {
          const options = [];
          task.options.map((option) => options.push(option.option));
          questionCollections.push({
            question: task.title,
            imageUrl: task.imageUrl,
            options,
          });
        }
      });
      let examDate = getExam.examDate.split("/");
      examDate = `${
        eval(examDate[0]) < 10 ? "0" + eval(examDate[0]) : eval(examDate[0])
      }/${eval(examDate[1]) < 10 ? "0" + examDate[1] : examDate[1]}/${
        examDate[2]
      }`;

      const studentPerform = getExam.studentsPerformance.filter(
        (task) => task.id.valueOf() == User._id.valueOf()
      );

      const studentAnswers = [];
      for (let i = 0; i < questionCollections.length; i++) {
        studentAnswers.push(null);
      }
      const isBookmarked = [];
      for (let i = 0; i < questionCollections.length; i++) {
        isBookmarked.push(false);
      }
      console.log(getExam.examStartTime.split(":").length);
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
            // currentIndex:studentPerform[0].currentIndex,
            negativeMark: getExam.negativeMark,
            totalMark: getExam.totalMark,
            status: getExam.status,
            windowCloseWarning: getExam.windowCloseWarning,
            windowResizedWarning: getExam.windowResizedWarning,
          },
        ],
      };
      res.json(examInfoData);
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
    status,
  } = req.body;
  try {
    const User = await user.findOne({ _id: userID });
    const examState = await exam.findOne({ _id: examID });
    if (User) {
      if (examState) {
        examState.map((task) =>
          task.studentsPerformance.map((task) => {
            if (User._id.valueOf() == task.id.valueOf()) {
              task.currentIndex = currentIndex;
              task.studentAnswerList = studentAnswerList;
              task.bookmarkedQuestionList = bookmarkedQuestionList;
              task.windowCloseWarning = windowCloseWarning;
              task.windowResizedWarning = windowResizedWarning;
              task.status = status;
            }
          })
        );
        examState.save();
        res.json({
          status: "success",
          message: "Update exam state successfully",
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
