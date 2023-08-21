import ExamInfo from "./pages/ExamInfo";
import ExamState from "./pages/ExamState";
import ExamResult from "./pages/ExamResult";
import { useState, useEffect } from "react";
import { Stack } from "@mui/material";

export default function Exam() {
  const path = window.location.pathname;
  const examID = '64e2cf4e06b38fbad4f42a13'
  const [examInfo, setExamInfo] = useState(null);
  // window.addEventListener("beforeunload", (ev) => {
  //   console.log(ev);
  //   ev.preventDefault();
  //   return (ev.returnValue = "Are you sure you want to close?");
  // });

  // window.oncontextmenu = () => {
  //   return false;
  // };

  // window.onkeydown =
  //   window.onkeyup =
  //   window.onkeypress =
  //     () => {
  //       window.event.returnValue = false;
  //       return false;
  //     };

  // let h = window.innerHeight;
  // let w = window.innerWidth;

  // window.onresize = () => {
  //   if (h !== window.innerHeight || w !== window.innerWidth) {
  //     console.log("You are not allowed to resize the window!");
  //   }
  // };

  // window.onblur = function () {
  //   console.log("blur");
  // };

  // window.onfocus = function () {
  //   console.log("focus");
  // };

  const disableTextSelection = {
    // MozUserSelect: "none",
    // WebkitUserSelect: "none",
    // msUserSelect: "none",
    // userSelect: "none",
    width: "100%",
    height: "100vh",
    overFlow: "hidden",
  };



  return (
    <Stack style={disableTextSelection}>
      <Stack
        direction="column"
        alignItems="center"
      >
        {path === "/exam/info" && <ExamInfo />}
        {path === "/exam/state" && <ExamState />}
        {/* {examInfo == null ? null : path === "/exam/state" && <ExamState exam={examInfo}/>} */}
        {path === "/exam/result" && <ExamResult />}
      </Stack>
    </Stack>
  );
}
