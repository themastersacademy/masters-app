import { Paper, Stack } from "@mui/material";

export default function QuestionCollections() {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: "20px",
        width: "100%",
        height: "100%",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "#187163",
              border: "2px solid #187163",
              marginRight: "10px",
            }}
          ></div>
          <p>1 answered</p>
        </Stack>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "#FEA800",
              border: "2px solid #FEA800",
              marginRight: "10px",
            }}
          ></div>
          <p>1 marked</p>
        </Stack>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "2px",
              backgroundColor: "white",
              border: "2px solid #9B9B9B",
              marginRight: "10px",
            }}
          ></div>
          <p>10 unanswered</p>
        </Stack>
      </Stack>
      
    </Paper>
  );
}
