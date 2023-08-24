import { Paper } from "@mui/material";
import PracticeTest from "./PracticeTest";
import MockTest from "./MockTest";

export default function TestCard(
{  selectGoal,
  setSelectGoal,
  Notificate,
  createPractiesExam
}
) {
  
  return selectGoal && (
      <Paper
        sx={{
          borderRadius: "20px",
          overflow: "hidden",
          padding: "20px",
          margin: "20px 0",
        }}
      >
        <PracticeTest
          selectGoal={selectGoal}
          setSelectGoal={setSelectGoal}
          Notificate={Notificate}
          createPractiesExam={createPractiesExam}
        />
        <MockTest selectGoal={selectGoal} setSelectGoal={setSelectGoal} />
      </Paper>
    // )
  );
}
