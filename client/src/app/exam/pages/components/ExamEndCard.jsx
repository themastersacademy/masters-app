import { Paper, Stack, Button } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function ExamEndCard({ title, isMobileView, toggleDrawer }) {
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        height: isMobileView ? "50px" : "70px",
        borderRadius: isMobileView ? 0 : "20px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          padding: isMobileView ? "0 20px" : "10px 30px",
          height: isMobileView ? "50px" : "70px",
        }}
      >
        {!isMobileView ? (
          <h2
            style={{
              fontWeight: "500",
              fontSize: "20px",
            }}
          >
            {title}
          </h2>
        ) : (
          <Button
            variant="text"
            onClick={toggleDrawer(true)}
            sx={{
              textTransform: "none",
              color: "#187163",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            {`Q1 of 13`}
            <ExpandMore sx={{ fontSize: "20px" }} />
          </Button>
        )}
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#187163",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#187163",
              color: "#fff",
            },
          }}
        >
          End Test
        </Button>
      </Stack>
    </Paper>
  );
}
