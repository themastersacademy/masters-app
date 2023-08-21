import { Paper, Stack, Button } from "@mui/material";

export default function QuestionActionCard({
  handleNextQuestion,
  handlePreviousQuestion,
  isMobileView,
}) {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px 20px",
        borderRadius: isMobileView ? 0 : "20px",
        height: "80px",
        margin: isMobileView ? "20px" : 0,
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button
          variant="contained"
          onClick={handlePreviousQuestion}
          sx={{
            textTransform: "none",
            backgroundColor: "#D1E3E0",
            color: "#187163",
            "&:hover": {
              backgroundColor: "#D1E3E0",
              color: "#187163",
            },
            border: "2px solid #187163",
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={handleNextQuestion}
          sx={{
            textTransform: "none",
            backgroundColor: "#187163",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#187163",
              color: "#fff",
            },
            border: "2px solid #187163",
          }}
        >
          Next
        </Button>
      </Stack>
    </Paper>
  );
}
