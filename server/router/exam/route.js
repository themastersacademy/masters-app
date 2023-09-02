const router = require("express").Router();
const {getExamInfo, startExam, getExamState,examStateUpdate,submitExam,getExamResult} = require('../../controller/exam/controller.js')
const { createPracticesExam,createMockExam } = require('../../controller/admin/exam/createExam.js')
const {solution} = require('../../controller/exam/resultSolution.js')
const {rank} = require('../../controller/exam/rank.js')
//get
router.get('/get-exam-info/*',getExamInfo);
router.get('/start-exam/*',startExam);
router.get('/get-exam-state/*',getExamState);
router.get('/rank/*',rank)

router.get('/submitExam',submitExam);
router.get('/get-exam-result/*',getExamResult);
//exam/solution
router.get("/solution/*",solution)
//post
router.post('/stateUpdate',examStateUpdate)

//post

//createPractiesExam
router.post("/createPracticesExam", createPracticesExam);
router.post("/createMockExam",createMockExam)




module.exports = router;