import { Paper, Stack, Button } from "@mui/material";
import { useState, useEffect } from "react";
import ExamHeader from "./components/ExamHeader";

export default function ExamState() {
  return (
    <Stack
      sx={{
        width: "100%",
        padding: "0px 20px",
        maxWidth: "1240px",
      }}
    >
      <ExamHeader isExamState={true} />
    </Stack>
  );
}
