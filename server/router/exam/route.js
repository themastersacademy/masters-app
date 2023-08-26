const router = require("express").Router();
const {getExamInfo, startExam, getExamState,examStateUpdate,submitExam,getExamResult} = require('../../controller/exam/controller.js')
const { createPracticesExam,createMockExam } = require('../../controller/admin/exam/createExam.js')


//get
router.get('/get-exam-info/*',getExamInfo);
router.get('/start-exam/*',startExam);
router.get('/get-exam-state/*',getExamState);

router.get('/submitExam',submitExam);
router.get('/get-exam-result/*',getExamResult);
//post
router.post('/stateUpdate',examStateUpdate)

//post

//createPractiesExam
router.post("/createPracticesExam", createPracticesExam);
router.post("/createMockExam",createMockExam)

module.exports = router;