const router = require("express").Router();
const {getExamInfo, startExam, getExamState } = require('../../controller/exam/controller.js')
const { createPractiesExam } = require('../../controller/admin/exam/createExam.js')

//get
router.get('/get-exam-info/*',getExamInfo);
router.get('/start-exam/*',startExam);
router.get('/get-exam-state/*',getExamState);

//post

//createPractiesExam
router.post("/createPractiesExam", createPractiesExam);


module.exports = router;