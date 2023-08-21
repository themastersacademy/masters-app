const e = require("express");
const exam = require("../../models/exam.js");
const user = require("../../models/user.js");

exports.getExamInfo = async function (req, res) {
  const path = req.path;
  console.log(path);
  const examId = path.split("/")[2];
  try {
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
    throw error;
  }
};

exports.startExam = async function (req, res) {
  const path = req.path;
  const examId = path.split("/")[2];
  const userID = req.session.userID;
  try {
    const examInfo = await exam.findOne({ _id: examId });
    if (!examInfo) {
      return res.status(404).send("exam not found");
    }
    if (examInfo.type === "schedule") {
      const get = examInfo.studentsPerformance.filter(
        (task) => task.id.valueOf() == userID.valueOf()
      );
      console.log(get);
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
        } else {
          return res.status(400).json({ message: "exam not started yet" });
        }
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
    
};
