import { Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ExamHeader from "./components/ExamHeader";

export default function ExamInfo() {
  const { search } = useLocation();
  const examId = search.split("=")[1];
  const [examInfo, setExamInfo] = useState(null);
  const [isScheduled, setIsScheduled] = useState(false);

  useEffect(() => {
    fetch(`/api/exam/get-exam-info/${examId}`)
      .then((res) => res.json())
      .then((data) => {
        setExamInfo(data);
        setIsScheduled(()=>{
          return data.type === "schedule" ? true : false
        });
        console.log(data.examDate);
      });
  }, [examId]);

  return (
    examInfo && (
      <Stack
        sx={{
          width: "100%",
          padding: "0px 20px",
          marginTop: "20px",
          maxWidth: "1240px",
        }}
      >
        <ExamHeader />
        <ExamInfoBody
          isScheduled={isScheduled}
          examName={examInfo.title}
          scheduledTime={`${examInfo.examStartTime}:00`}
          scheduledDate={examInfo.examDate}
          examId={examId}
        />
      </Stack>
    )
  );
}

const ExamInfoBody = ({
  examName,
  isScheduled,
  scheduledTime,
  scheduledDate,
  examId
}) => {
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [currentDate, setCurrentDate] = useState("00/00/0000");
  const [remainingTime, setRemainingTime] = useState("0d 0h 0m 0s");

  const updateExamTime = () => {
    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
  };

  const updateExamDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    setCurrentDate(`${day}/${month}/${year}`);
  };

  const calculateRemainingTime = () => {
    let examTime = scheduledTime.split(":");
    let examDate = scheduledDate.split("/");
    let examHours = examTime[0];
    let examMinutes = examTime[1];
    let examSeconds = examTime[2];
    let examDay = examDate[0];
    let examMonth = examDate[1];
    let examYear = examDate[2];
    let examDateObject = new Date(
      `${examMonth}/${examDay}/${examYear} ${examHours}:${examMinutes}:${examSeconds}`
    );
    let currentDateObject = new Date();
    let remainingTime = examDateObject - currentDateObject;
    return remainingTime;
  };

  const getRemainingTime = () => {
    let remainingTime = calculateRemainingTime();
    let seconds = Math.floor((remainingTime / 1000) % 60);
    let minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    let hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    let days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    if (remainingTime < 0) {
      setIsTimeOver(true);
      setRemainingTime("0d 0h 0m 0s");
    } else {
      setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }
  };
  setInterval(() => {
    updateExamTime();
    updateExamDate();
    getRemainingTime();
  }, 1000);

   const getExamState = () => {
    
   }


  return (
    <Paper
      elevation={2}
      sx={{
        padding: "40px 30px",
        borderRadius: "20px",
        width: "100%",
        margin: "30px 0px",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <h1
          style={{
            fontWeight: "700",
            fontSize: "26px",
            color: "#187163",
          }}
        >
          {examName}
        </h1>
        <h2
          style={{
            fontWeight: "700",
            fontSize: "20px",
          }}
        >
          Instructions
        </h2>
        <ol
          style={{
            textAlign: "left",
            fontWeight: "500",
            fontSize: "18px",
            width: "80%",
            lineHeight: "34px",
            color: "#3F3F3F",
          }}
        >
          <li>This Test booklet consists of 30 questions.</li>
          <li>There is no time limit for each questions.</li>
          <li>All the questions were given as multiple choice questions.</li>
          <li>The total duration is 45 minutes.</li>
          <li>The maximum mark can be attempted in this test is 120.</li>
        </ol>
        {isScheduled ? (
          <>
            <h2
              style={{
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              Exam Starts In
            </h2>
            <h1
              style={{
                fontWeight: "700",
                fontSize: "26px",
                color: "#FEA800",
              }}
            >
              {remainingTime}
            </h1>
          </>
        ) : null}
        <Button
          variant="contained"
          disabled={!isTimeOver}
          sx={{
            textTransform: "none",
            backgroundColor: "#187163",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#187163",
              color: "#fff",
            },
          }}
          onClick={() => {
            fetch(`/api/exam/start-exam/${examId}`)
              .then((res) => res.json())
              .then((data) => {
                console.log(data);
                // window.location.href = `/exam/state?=${examId}`;
              });
          }}
        >
          Start Test
        </Button>
      </Stack>
    </Paper>
  );
};
