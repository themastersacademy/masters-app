import { Paper, Stack, Button } from "@mui/material";

export default function MockTest({ MD }) {
  return (
    <Paper
      elevation={MD ? 0 : 2}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
        padding: "20px",
      }}
    >
      <h3
        style={{
          fontSize: MD ? "18px" : "22px",
          fontWeight: "600",
          color: "#656565",
          marginBottom: "10px",
        }}
      >
        Mock Test Series
      </h3>
      <h4
        style={{
          fontSize: MD ? "16px" : "18px",
          fontWeight: "400",
          color: "#656565",
          marginBottom: "10px",
        }}
      >
        Placement Training
      </h4>
      <Stack direction="row" justifyContent="space-between" margin={"20px 0"}>
        <div>
          <div
            style={{
              fontSize: MD ? "16px" : "18px",
              fontWeight: "500",
              color: "#187163",
              marginBottom: "5px",
            }}
          >
            Time allowed
          </div>
          <div
            style={{
              fontSize: MD ? "18px" : "22px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            60 Mins
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: MD ? "16px" : "18px",
              fontWeight: "500",
              color: "#187163",
              marginBottom: "5px",
            }}
          >
            No of Questions
          </div>
          <div
            style={{
              fontSize: MD ? "18px" : "22px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            40
          </div>
        </div>
        <div>
          <div
            style={{
              fontSize: MD ? "16px" : "18px",
              fontWeight: "500",
              color: "#187163",
              marginBottom: "5px",
            }}
          >
            Total Marks
          </div>
          <div
            style={{
              fontSize: MD ? "18px" : "22px",
              fontWeight: "600",
              marginBottom: "5px",
            }}
          >
            160
          </div>
        </div>
      </Stack>
      <Button
        variant="contained"
        fullWidth
        sx={{
          textTransform: "none",
          backgroundColor: "#187163",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#187163",
            color: "#fff",
          },
          padding: "10px",
        }}
      >
        Start Mock
      </Button>
    </Paper>
  );
}
