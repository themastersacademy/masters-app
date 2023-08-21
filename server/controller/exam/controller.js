const exam = require("../../models/exam.js");
const user = require("../../models/user.js");
const questionCollection = require("../../models/questionCollection.js");

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
  const path = req.path;
  const userID = req.session.userID;
  const examId = path.split("/")[2];

  try {
    const getExam = await exam.findOne({ _id: examId });
    const getQuestionCollection = await questionCollection.find();

    if (getExam) {
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
            title: task.title,
            imageUrl: task.imageUrl,
            options,
          });
        }
      });

      let examDate = getExam.examDate.split("/");
      // examDate = `${examDate[1]}/${examDate[0]}/${examDate[2]}`;

      examDate = `${
        eval(examDate[0]) < 10 ? "0" + eval(examDate[0]) : eval(examDate[0])
      }/${eval(examDate[1]) < 10 ? "0" + examDate[1] : examDate[1]}/${
        examDate[2]
      }`;

      const examInfoData = {
        examTitle: getExam.title,
        examDate: examDate,
        examStartTime: `${getExam.examStartTime}:00`,
        examEndTime: `${getExam.examEndTime}:00`,
        examDuration: `${getExam.examDuration}:00`,
        mark: getExam.mark,
        negativeMark: getExam.negativeMark,
        questionCategoryList,
        questionCollections,
      };
      console.log(examInfoData);

      res.json(examInfoData);
    }
  } catch (error) {}
};
