import { Paper, CircularProgress, Box, Stack } from "@mui/material";
import { circularProgressClasses } from "@mui/material/CircularProgress";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function ExamTimerCard({
  remainingTime,
  timePercentage,
  isMobileView,
}) {
  return !isMobileView ? (
    <Paper
      sx={{
        p: 2,
        height: "240px",
        width: "100%",
        borderRadius: "20px",
        boxShadow: 1,
        bgcolor: "background.paper",
      }}
    >
      <h2
        style={{
          fontWeight: "700",
          fontSize: "20px",
          marginBottom: "1rem",
        }}
      >
        Time Left:
      </h2>
      <Stack alignItems="center" sx={{ position: "relative", width: "100%" }}>
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#C5CFD3",
          }}
          size={150}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="determinate"
          sx={{
            color: "#187163",
            animationDuration: "1000ms",
            position: "absolute",
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={150}
          thickness={4}
          value={timePercentage}
        />
        <p
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontWeight: "700",
            fontSize: "18px",
            color: "#187163",
          }}
        >
          {remainingTime}
        </p>
      </Stack>
    </Paper>
  ) : (
    <Paper
      elevation={3}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontWeight: "700",
        fontSize: "18px",
        color: "#187163",
        borderRadius: "0",
        height: "50px",
      }}
    >
      <AccessTimeIcon />
      {remainingTime}
    </Paper>
  );
}
