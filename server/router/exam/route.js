const router = require("express").Router();
const {getExamInfo, startExam, getExamState,examStateUpdate,submitExam} = require('../../controller/exam/controller.js')
const { createPracticesExam } = require('../../controller/admin/exam/createExam.js')


//get
router.get('/get-exam-info/*',getExamInfo);
router.get('/start-exam/*',startExam);
router.get('/get-exam-state/*',getExamState);
router.get('/submitExam',submitExam);
//post
router.post('/stateUpdate',examStateUpdate)

//post

//createPractiesExam
router.post("/createPracticesExam", createPracticesExam);


module.exports = router;