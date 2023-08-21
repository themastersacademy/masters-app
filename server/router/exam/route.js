const router = require("express").Router();
const {getExamInfo, startExam, getExamState } = require('../../controller/exam/controller.js')

router.get('/get-exam-info/*',getExamInfo);
router.get('/start-exam/*',startExam);
router.get('/get-exam-state/*',getExamState);

module.exports = router;