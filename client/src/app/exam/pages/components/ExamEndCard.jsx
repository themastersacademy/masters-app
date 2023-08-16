import { Paper, Stack, Button } from "@mui/material";

export default function ExamEndCard() {
  return (
    <Paper
          elevation={2}
          sx={{
            width: "100%",
            height: "70px",
            borderRadius: "20px",
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              padding: "10px 30px",
              height: "70px",
            }}
          >
            <h2
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              {"Mock Test - 1"}
            </h2>
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
  )
}
