import { Paper, Stack, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ScheduleTestCard({ batch }) {
  return (
    <Paper
      sx={{
        width: "100%",
        height: "100px",
        maxHeight: "250px",
        overflowY: "scroll",
        "::-webkit-scrollbar": {
          display: "none",
        },
        padding: "10px 20px",
        "& .MuiAccordionSummary-root:hover, .MuiButtonBase-root:hover": {
          cursor: "default",
        },
      }}
    >
      {batch.map((task, index) => (
        <Stack key={index}>
          <p style={{ fontWeight: "700" }}>{task.batchName}</p>
          {task.scheduleTest.length !== 0 ? (
            <div>
             
              {task.scheduleTest.map((task) => (
                <SheduleTest
                  name={task.name}
                  examID={task.examID}
                  key={index}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                fontWeight: "400",
                color: "gray",
              }}
            >
              No Active Test
            </div>
          )}
        </Stack>
      ))}
    </Paper>
  );
}

const SheduleTest = ({ name, examID }) => {
  const nevigator = useNavigate();
  const handleClick = () => {
    nevigator(`/exam/info?=${examID}`);
  };
  const style = {
    button: {
      textTransform: "none",
      background: "#187163",
      color: "white",
      cursor: "pointer",
      width: "20px",
    },
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      padding="10px"
      width="100%"
      height="50px"
      borderRadius="20px"
    >
      <p style={{ fontWeight: "500" }}>{name}</p>
      <Button onClick={handleClick} style={style.button}>
        View
      </Button>
    </Stack>
  );
};
