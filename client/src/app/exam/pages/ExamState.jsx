import { Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ExamHeader from "./components/ExamHeader";
import ExamEndCard from "./components/ExamEndCard";
import QuestionStateCard from "./components/QuestionStateCard";
import QuestionActionCard from "./components/QuestionActionCard";
import ExamTimerCard from "./components/ExamTimerCard";
import QuestionCollections from "./components/QuestionCollections";
import examInfoData from "./components/examInfoData";

export default function ExamState() {
  const [examInfo, setExamInfo] = useState(examInfoData);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [remainingTime, setRemainingTime] = useState("00:00:00");
  const [timePercentage, setTimePercentage] = useState(0);

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

  return (
    <Stack
      sx={{
        width: "100%",
        padding: "20px 0",
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
            index={0}
            mark="+4"
            negativeMark="-1"
            isBookmarked={true}
            imageUrl="https://www.rd.com/wp-content/uploads/2021/06/mathpuzzle1.jpg?resize=3000"
            question={"What is the value of 2+2?"}
          />
          <QuestionActionCard />
        </Stack>
      </Stack>
      <Stack direction="column" width="70%" gap={2}>
        <ExamEndCard title={examInfo.examTitle}/>
        <ExamTimerCard
          remainingTime={remainingTime}
          timePercentage={timePercentage}
        />
        <QuestionCollections />
      </Stack>
    </Stack>
  );
}
