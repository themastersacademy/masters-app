import { Paper } from "@mui/material";
import PracticeTest from "./PracticeTest";
import MockTest from "./MockTest";

export default function TestCard() {
  return (
    <Paper sx={{
        borderRadius: "20px",
        overflow: "hidden",
        padding: "20px",
        margin: "20px 0",
    }}>
        <PracticeTest />
        <MockTest />
    </Paper>
  )
}
