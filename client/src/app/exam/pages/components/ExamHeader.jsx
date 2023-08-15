import { Paper, Stack, Avatar, Button } from "@mui/material";
import Avater from "../../../../util/Avater";

export default function ExamHeader({ isExamState }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
        marginTop: "20px",
      }}
      gap={2}
    >
      <Paper
        elevation={2}
        sx={{
          width: "140%",
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
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <img src={Avater.LOGO} alt="Avatar" />
            <h1
              style={{
                fontWeight: "500",
                fontSize: "20px",
              }}
            >
              The <font color="#FEA800">Masters Academy</font>
            </h1>
          </Stack>
          <Avatar
            sx={{
              width: "50px",
              height: "50px",
            }}
          >
            <img src={Avater.student} alt="" />
          </Avatar>
        </Stack>
      </Paper>
      {isExamState && (
        <Paper
          elevation={2}
          sx={{
            width: "70%",
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
      )}
    </Stack>
  );
}
