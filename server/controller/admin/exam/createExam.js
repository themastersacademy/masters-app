const Exam = require("../../../models/exam");
const Batch = require("../../../models/batch");
const institution = require("../../../models/institution");
const questionBank = require("../../../models/questionBank");
const User = require("../../../models/user");
const Course = require("../../../models/course");
const Goal = require("../../../models/goal");
const questionCollection = require("../../../models/questionCollection");
const { createPracticeExamQues } = require("../../../util/createQuestion");
exports.createScheduleExam = async (req, res, next) => {
  const questionID = [];
  const finalQues = [];
  const indexValue = [];
  const id = req.body.id;
  const details = req.body.details;
  const type = req.body.type;
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

      const questionCategory = [];
      finalQues.map((task, index) => {
        const list = [];
        if (task.easy) task.easy.map((easy) => list.push({ id: easy }));
        if (task.medium) task.medium.map((medium) => list.push({ id: medium }));
        if (task.hard) task.hard.map((hard) => list.push({ id: hard }));

        questionCategory.push({
          title: task.title,
          id: task.id,
          questionList: list,
        });
      });
      const examDate = new Date(details.setDate);

      const exam = await Exam({
        type: type,
        batchID: id,
        title: details.setExamTitle,
        examDate: `${examDate.getDate()}/${eval(
          examDate.getMonth() + 1
        )}/${examDate.getFullYear()}`,
        examStartTime: details.setTimeFrom,
        examEndTime: details.setTimeTo,
        examDuration: details.examDuration,
        mark: details.setMark,
        negativeMark: details.setNegativeMark,
        questionCategory: questionCategory,
      });
      exam.save();

      batch.scheduleTest.push({ name: details.setExamTitle, examID: exam._id });
      batch.save();
      res.json({
        status: "success",
        message: "Create schedule text successfully",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createPracticesExam = async (req, res, next) => {
  try {
    const { id, selectGoal, value } = req.body;
    const goal = await Goal.findOne({
      courseId: selectGoal.courseId,
      userId: id,
    });
    //console.log(goal);
    const user = await User.findOne({ _id: id });
    if (user) {
      const course = await Course.findOne({ _id: selectGoal.courseId });
      if (course) {
        const check = [];
        const collectSelectTopic = [];
        const questionID = [];
        const finalQuestion = [];
        selectGoal.topic.map((task) => {
          if (task.isSelect == true) {
            check.push(task.id.valueOf());

            questionID.push({
              title: task.title,
              id: task.id,
              bankID: task.bankID,
              type: task.type,
              easy: [],
              medium: [],
              hard: [],
              requireEasy: 0,
              requireMedium: 0,
              requireHard: 0,
            });
            finalQuestion.push({
              title: task.title,
              id: task.id,
              bankID: task.bankID,
              type: task.type,
              questions: [],
            });
          }
        });
        course.collections.map((task) =>
          task.topic.map((task) => {
            if (check.indexOf(task.id.valueOf()) !== -1)
              collectSelectTopic.push(task);
          })
        );

        if (value.value % check.length == 0) {
          for (let i = 0; i < check.length; i++) {
            if (value.selectLevel == "easy")
              questionID[i].requireEasy = value.value / check.length;
            if (value.selectLevel == "medium")
              questionID[i].requireMedium = value.value / check.length;
            if (value.selectLevel == "hard")
              questionID[i].requireHard = value.value / check.length;
          }
        } else {
          const actualValue = value.value % check.length;

          for (let i = 0; i < check.length; i++) {
            if (value.selectLevel == "easy")
              questionID[i].requireEasy =
                (value.value - actualValue) / check.length;
            if (value.selectLevel == "medium")
              questionID[i].requireMedium =
                (value.value - actualValue) / check.length;
            if (value.selectLevel == "hard")
              questionID[i].requireHard =
                (value.value - actualValue) / check.length;
          }
          for (let j = 0; j < actualValue; j++) {
            if (value.selectLevel == "easy")
              questionID[j].requireEasy = 1 + questionID[j].requireEasy;
            if (value.selectLevel == "medium")
              questionID[j].requireMedium = 1 + questionID[j].requireMedium;
            if (value.selectLevel == "hard")
              questionID[j].requireHard = 1 + questionID[j].requireMedium;
          }
        }
        /// get questions
        const getBankID = [];

        questionID.map((task) => getBankID.push(task.bankID.valueOf()));

        const questions = await createPracticeExamQues(
          getBankID,
          questionID,
          finalQuestion
        );
        console.log(questions);
        const questionCategory = [];

        questions.map((task, index) => {
          const questionList = [];
          task.questions.map((task) => questionList.push({ id: task.id }));
          questionCategory.push({
            title: task.title,
            id: task.bankID,
            questionList,
          });
        });
        const countPractice = goal.examHistory.filter(
          (task) => task.type == "practice"
        );
        const durationPerQuestion = 90; //seconds;
        //examDuration = "00:00:00"
        const questionCount = value.value;
        let totalSeconds = durationPerQuestion * questionCount;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        const examDuration = `${hours}:${minutes}:${seconds}`;

        const date = new Date();
        const createExam = await Exam({
          type: "practice",
          title: `Practice Exam ${countPractice.length + 1}`,
          courseId: selectGoal.courseId,
          questionCategory,
          examDate: `${
            eval(date.getDate()) < 10 ? "0" + date.getDate() : date.getDate()
          }/${
            eval(date.getMonth() + 1) < 10
              ? "0" + eval(date.getMonth() +1)
              : date.getMonth()
          }/${date.getFullYear()}`,
          examDuration,
          mark: 4,
          negativeMark: 1,
        });
        createExam.save();
        res.json({
          status: "success",
          message: "Create practice exam successfully",
          examId: createExam._id,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};