import { Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ExamHeader from "./components/ExamHeader";
import ExamEndCard from "./components/ExamEndCard";
import QuestionStateCard from "./components/QuestionStateCard";
import QuestionActionCard from "./components/QuestionActionCard";
import ExamTimerCard from "./components/ExamTimerCard";
import QuestionCollections from "./components/QuestionCollections";
import examInfoData from "./components/examInfoData";
import useWindowDimensions from "../../../util/useWindowDimensions";

export default function ExamState() {
  const examID = "64e2cf4e06b38fbad4f42a13";
  const examID = '64e37483972b25e810dd5b61'
  const { width, height } = useWindowDimensions();
  const [examInfo, setExamInfo] = useState(examInfoData);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [timePercentage, setTimePercentage] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // const [isMobileView, setIsMobileView] = useState(width < 1060);
  const [studentAnswers, setStudentAnswers] = useState(() => {
  const [studentAnswers, setStudentAnswers] = useState(() =>{
    let studentAnswers = [];
    for (let i = 0; i < examInfo.questionCollections.length; i++) {
      studentAnswers.push(null);
    }
    return studentAnswers;
  });
  const [isBookmarked, setIsBookmarked] = useState(() => {
    let isBookmarked = [];
    for (let i = 0; i < examInfo.questionCollections.length; i++) {
      isBookmarked.push(false);
    }
    return isBookmarked;
  });

  console.log(studentAnswers);
  console.log(isBookmarked);

  const calculateRemainingTime = () => {
    let examTime = examInfo.examEndTime.split(":");
    let examDate = examInfo.examDate.split("/");
    let examDay = examDate[0];
    let examMonth = examDate[1];
    let examYear = examDate[2];
    let examHours = examTime[0];
    let examMinutes = examTime[1];
    let examSeconds = examTime[2];
    let examDateObject = new Date(
      `${examMonth}/${examDay}/${examYear} ${examHours}:${examMinutes}:${examSeconds}`
    );
    let currentDateObject = new Date();
    let remainingTime = examDateObject - currentDateObject;
    return remainingTime;
  };

  const calculateTimePercentage = (remainingTime) => {
    let examDuration = examInfo.examDuration.split(":");
    let examHours = examDuration[0];
    let examMinutes = examDuration[1];
    let examSeconds = examDuration[2];
    let examDurationInMilliseconds =
      examHours * 60 * 60 * 1000 + examMinutes * 60 * 1000 + examSeconds * 1000;
    let timePercentage = (remainingTime / examDurationInMilliseconds) * 100;
    return timePercentage;
  };

  const getRemainingTime = () => {
    let remainingTime = calculateRemainingTime();
    let remainingTimePercentage = calculateTimePercentage(remainingTime);
    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    let remainingTimeString = `${hours}:${minutes}:${seconds}`;
    if (remainingTime < 0) {
      setIsTimeOver(true);
      setRemainingTime("00:00:00");
      setTimePercentage(0);
    } else {
      setRemainingTime(remainingTimeString);
      setTimePercentage(remainingTimePercentage);
    }
  };

  useEffect(() => {
    setInterval(() => {
      getRemainingTime();
    }, 1000);
  }, []);

  useEffect(() => {
    fetch(`/api/exam/get-exam-state/${examID}`)
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);
    .then(res => res.json())
    .then((data) =>{ 
      console.log(data)
      setExamInfo(data)
      setStudentAnswers(data.studentsPerformance[0].studentAnswerList)
      setIsBookmarked(data.studentsPerformance[0].bookmarkedQuestionList)
      })
  },[])

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examInfo.questionCollections.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestionIndex(index);
  };

  const handleOptionClick = (index) => {
    let newStudentAnswers = [...studentAnswers];
    newStudentAnswers[currentQuestionIndex] = index;
    setStudentAnswers(newStudentAnswers);
  };

  const handleBookmarkClick = () => {
    let newIsBookmarked = [...isBookmarked];
    newIsBookmarked[currentQuestionIndex] =
      !newIsBookmarked[currentQuestionIndex];
    setIsBookmarked(newIsBookmarked);
  };

  return width > 1060 ? (
    <DtView
      currentQuestionIndex={currentQuestionIndex}
      handleNextQuestion={handleNextQuestion}
      handlePreviousQuestion={handlePreviousQuestion}
      handleQuestionClick={handleQuestionClick}
      handleOptionClick={handleOptionClick}
      handleBookmarkClick={handleBookmarkClick}
      isBookmarked={isBookmarked}
      studentAnswers={studentAnswers}
      examInfo={examInfo}
      remainingTime={remainingTime}
      timePercentage={timePercentage}
      // isMobileView={isMobileView}
    />
  ) : (
    <MobileView
      currentQuestionIndex={currentQuestionIndex}
      handleNextQuestion={handleNextQuestion}
      handlePreviousQuestion={handlePreviousQuestion}
      handleQuestionClick={handleQuestionClick}
      handleOptionClick={handleOptionClick}
      handleBookmarkClick={handleBookmarkClick}
      isBookmarked={isBookmarked}
      studentAnswers={studentAnswers}
      examInfo={examInfo}
      remainingTime={remainingTime}
      timePercentage={timePercentage}
      // isMobileView={isMobileView}
    />
  );
}

const DtView = ({
  currentQuestionIndex,
  handleNextQuestion,
  handlePreviousQuestion,
  handleQuestionClick,
  handleOptionClick,
  handleBookmarkClick,
  isBookmarked,
  studentAnswers,
  examInfo,
  remainingTime,
  timePercentage,
}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: "20px 20px",
        maxWidth: "1240px",
        height: "100vh",
      }}
      direction="row"
      gap={2}
    >
      <Stack direction="column" width="130%" gap={2}>
        <ExamHeader />
        <Stack
          direction="column"
          height={"100%"}
          justifyContent={"space-between"}
        >
          <QuestionStateCard
            index={currentQuestionIndex}
            mark={examInfo.mark}
            negativeMark={examInfo.negativeMark}
            handleOptionClick={handleOptionClick}
            handleBookmarkClick={handleBookmarkClick}
            isBookmarked={isBookmarked[currentQuestionIndex]}
            imageUrl={
              examInfo.questionCollections[currentQuestionIndex].imageUrl
            }
            question={
              examInfo.questionCollections[currentQuestionIndex].question
            }
            optionList={
              examInfo.questionCollections[currentQuestionIndex].options
            }
            studentAnswers={studentAnswers[currentQuestionIndex]}
          />
          <QuestionActionCard
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
          />
        </Stack>
      </Stack>
      <Stack direction="column" width="70%" gap={2}>
        <ExamEndCard title={examInfo.examTitle} />
        <ExamTimerCard
          remainingTime={remainingTime}
          timePercentage={timePercentage}
        />
        <QuestionCollections
          currentQuestionIndex={currentQuestionIndex}
          handleQuestionClick={handleQuestionClick}
          questionCategoryList={examInfo.questionCategoryList}
          isBookmarked={isBookmarked}
          studentAnswers={studentAnswers}
        />
      </Stack>
    </Stack>
  );
};

const MobileView = ({
  currentQuestionIndex,
  handleNextQuestion,
  handlePreviousQuestion,
  handleQuestionClick,
  handleOptionClick,
  handleBookmarkClick,
  isBookmarked,
  studentAnswers,
  examInfo,
  remainingTime,
  timePercentage,
}) => {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: "20 20px",
      }}
      direction="column"
      gap={2}
    >
      <ExamTimerCard
        remainingTime={remainingTime}
        timePercentage={timePercentage}
        isMobileView={true}
      />
      <QuestionStateCard
        index={currentQuestionIndex}
        mark={examInfo.mark}
        negativeMark={examInfo.negativeMark}
        handleOptionClick={handleOptionClick}
        handleBookmarkClick={handleBookmarkClick}
        isBookmarked={isBookmarked[currentQuestionIndex]}
        imageUrl={examInfo.questionCollections[currentQuestionIndex].imageUrl}
        question={examInfo.questionCollections[currentQuestionIndex].question}
        optionList={examInfo.questionCollections[currentQuestionIndex].options}
        studentAnswers={studentAnswers[currentQuestionIndex]}
        isMobileView={true}
      />
    </Stack>
  );
};
