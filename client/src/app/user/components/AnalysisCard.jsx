import { Paper, Stack } from "@mui/material";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
  //   Legend
);

export default function AnalysisCard({ MD }) {
  const data = {
    labels: [
      "Quantitative Aptitude",
      "Logical Reasoning",
      "Verbal Ability",
      "Technical Aptitude",
      "Coding",
      "Logical Reasoning",
      "Verbal Ability",
    ],
    datasets: [
      {
        data: [60, 90, 45, 53, 29, 78, 90],
        backgroundColor: "#FEA80060",
        borderColor: "#FEA800",
        borderWidth: 2,
      },
    ],
  };
  return (
    <Paper
      elevation={MD ? 0 : 2}
      sx={{
        borderRadius: MD ? 0 : "20px",
        overflow: "hidden",
        padding: MD ? 0 : "20px",
        marginTop: "20px",
      }}
    >
      <h3
        style={{
          fontSize: MD ? "18px" : "22px",
          fontWeight: "600",
          color: "#656565",
          marginBottom: "10px",
          padding: MD ? "20px" : 0,
        }}
      >
        Overall Analysis
      </h3>
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          maxHeight: MD ? "auto" : "500px",
        }}
      >
        <Radar data={data} />
      </Stack>
    </Paper>
  );
}
