const router = require("express").Router();
const {
  getBank,
  deleteQues,
  createQues,
  Get,
  getBankName,
  editQuestion,
  searchQues,
  createQuestionBank,
} = require("../../controller/admin/questionUpload/questionUpload.js");
const {
  createCourse,
  createCourseTopic,
  createCourseGroup,
  createGroupTopic,
  createCourseMock,
  createCourseDuration,
} = require("../../controller/admin/course/createCourse.js");
const {
  getCourse,
  getCourseDetails,
  getCollectionName,
  editGroupNameCourseCollection,
  getCourseAvalible,
  publishCourse,
  checkPublish,
  callDraft,
} = require("../../controller/admin/course/courses.js");
const {
  deleteCourseCollection,
  deleteGroupCourseCollection,
} = require("../../controller/admin/course/deleteCourse.js");

const { getUser, changeRoll } = require("../../controller/admin/user/user.js");
const { getInstitutions } = require("../../controller/admin/controller.js");

const {getInstitution,getInstituteName} = require('../../controller/admin/institute/institute.js')
const {createBatch,getBatechTopic,getHistory,getRequestAccess} = require('../../controller/admin/institute/batch.js')
const {
  deleteBatchTopic,
} = require("../../controller/admin/institute/delete.js");

const {createScheduleExam} =require('../../controller/admin/exam/createExam.js')

//GET

router.get("/getBank", getBank);
router.get("/getCourse", getCourse);
router.get("/getuser", getUser);
router.get("/getInstitution", getInstitutions);
router.get("/getInstitute",getInstituteName)
// POST

router.post("/question", Get);
router.post("/getBankName", getBankName);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getCourseAvalible", getCourseAvalible);

// create Course

router.post("/createCourse", createCourse);
router.post("/createCourseTopic", createCourseTopic);
router.post("/createGroupTopic", createGroupTopic);
router.post("/createCourseGroup", createCourseGroup);
router.post("/createCourseMock", createCourseMock);
router.post("/createCourseDuration", createCourseDuration);

// ques  create and bank
router.post("/createBank", createQuestionBank);
router.post("/createQuestion", createQues);

// serach and edit
router.post("/editQuestion", editQuestion);
router.post("/searchQues", searchQues);

// Delete
router.post("/deleteQuestion", deleteQues);
router.post("/deleteCourseCollection", deleteCourseCollection);
router.post("/deleteGroupCourseCollection", deleteGroupCourseCollection);
router.post("/deleteBatchTopic", deleteBatchTopic);
//getCollectionName

router.post("/getCollectionName", getCollectionName);

// edit Name
router.post("/editGroupNameCourseCollection", editGroupNameCourseCollection);

// course publish
router.post("/publishCourse", publishCourse);
router.post("/checkPublish", checkPublish);

// callDraft
router.post("/callDraft", callDraft);

// Institute
router.post("/changeRoll", changeRoll);
router.post("/getInstitution", getInstitution);

//createBatch

router.post("/createBatch", createBatch);
//getBatechTopic
router.post("/getBatechTopic", getBatechTopic);

//createScheduleExam
router.post('/createScheduleExam',createScheduleExam)


router.post('/getHistory',getHistory)

//getRequestAccess
router.post('/getRequestAccess',getRequestAccess)
module.exports = router;
