import { Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ExamHeader from "./components/ExamHeader";
import ExamEndCard from "./components/ExamEndCard";
import QuestionStateCard from "./components/QuestionStateCard";
import QuestionActionCard from "./components/QuestionActionCard";

export default function ExamState() {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: "20px 0",
        maxWidth: "1240px",
      }}
      direction="row"
      gap={2}
    >
      <Stack direction="column" width="140%" gap={2}>
        <ExamHeader />
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
      <Stack direction="column" width="70%" gap={2}>
        <ExamEndCard />
      </Stack>
    </Stack>
  );
}
