import { Stack, Paper } from "@mui/material";
import useWindowDimensions from "../../../util/useWindowDimensions";
import ExamHeader from "./components/ExamHeader";
import ExamResultAction from "./components/ExamResultAction";
import ExamResultStat from "./components/ExamResultStat";
import ExamResultAnalytics from "./components/ExamResultAnalytics";
import LeaderBoard from "./components/LeaderBoard";
import { useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
export default function ExamResult() {
  const { search } = useLocation();

  const examID = search.split("=")[1];
  const { width } = useWindowDimensions();
 const [examResult, setExamResult] = useState([]);
useEffect(() => {
    fetch(`/api/exam/get-exam-result/${examID}`)
      .then((res) => res.json())
      .then((data) => {
        setExamResult(data);
        console.log(data);
      });
}, [examID]);

  const analyticsList = [
    {
      title: "Accuracy",
      value: 80,
    },
    {
      title: "Speed",
      value: 40,
    },
    {
      title: "Time Spent",
      value: 75,
    },
    {
      title: "Accuracy",
      value: 69,
    },
    {
      title: "Speed",
      value: 92,
    },
    {
      title: "Time Spent",
      value: 94,
    },
    {
      title: "Accuracy",
      value: 35,
    },
  ];
  const leaderBoardList = [
    {
      name: "Rahul",
      avater: "MaleAvatar1",
      score: "100",
      rank: "1",
    },
    {
      name: "Hari",
      avater: "MaleAvatar4",
      score: "98",
      rank: "2",
    },
    {
      name: "Mari",
      avater: "MaleAvatar1",
      score: "98",
      rank: "3",
    },
    {
      name: "Kishore",
      avater: "MaleAvatar4",
      score: "94",
      rank: "4",
    },
    {
      name: "Priya",
      avater: "FemaleAvatar2",
      score: "93",
      rank: "5",
    },
  ];
  return (
    <Stack
      sx={{
        width: "100%",
        padding: width > 1024 ? "20px 20px" : "20px 10px",
        maxWidth: "1240px",
        backgroundColor: "#C5CFD3",
      }}
    >
      {width > 1024 ? (
        <DtView
        examResult={examResult}
          analyticsList={analyticsList}
          leaderBoardList={leaderBoardList}
        />
      ) : (
        <MobileView
        examResult={examResult}
          analyticsList={analyticsList}
          leaderBoardList={leaderBoardList}
        />
      )}
    </Stack>
  );
}

const DtView = ({ analyticsList, leaderBoardList,examResult }) => {
  return (
    <Stack direction="column" spacing={2} width={"100%"}>
      <ExamHeader />
      <ExamResultAction />
      <Paper
        sx={{
          borderRadius: "20px",
          width: "100%",
          height: "calc(100vh - 250px)",
          padding: "20px",
          overflow: "hidden",
        }}
      >
        <Stack direction="row" sx={{ width: "100%" }} gap={2}>
          <Stack direction="column" sx={{ width: "100%" }} gap={2}>
            <ExamResultStat
              totalMark={examResult.totalMarks}
              mark={examResult.mark}
              attempted={examResult.questionAttempted}
              unAttempted={examResult.questionUnAttempted}
            />
            {examResult.topics && 
          
          <ExamResultAnalytics 
          analyticsList={examResult.topics}
         
          /> 
        }
          </Stack>
          <LeaderBoard leaderBoardList={leaderBoardList} />
        </Stack>
      </Paper>
    </Stack>
  );
};

const MobileView = ({ analyticsList, leaderBoardList,examResult }) => {
  return (
    <Stack direction="column" spacing={2}>
      <ExamHeader isMobileView={true} />
      <ExamResultAction />
      <Paper
        sx={{
          borderRadius: "20px",
          width: "100%",
          padding: "20px",
        }}
      >
        <ExamResultStat
     totalMark={examResult.totalMarks}
     mark={examResult.mark}
     attempted={examResult.questionAttempted}
     unAttempted={examResult.questionUnAttempted}
        />
      </Paper>
      <LeaderBoard leaderBoardList={leaderBoardList} isMobileView={true} />
      <Paper
        sx={{
          borderRadius: "20px",
          width: "100%",
          padding: "20px",
        }}
      >
        {examResult.topics && 
          
          <ExamResultAnalytics 
          analyticsList={examResult.topics}
          isMobileView={true}
          /> 
        }
       
      </Paper>
    </Stack>
  );
};
