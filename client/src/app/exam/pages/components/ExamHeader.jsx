import { Paper, Stack, Avatar, Button } from "@mui/material";
import Avater from "../../../../util/Avater";

export default function ExamHeader() {
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
  );
}
