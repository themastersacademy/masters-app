import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Slide,
  Stack,
} from "@mui/material";
import { forwardRef } from "react";


const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ExamEndDialog({
  isDialogOpen,
  handleDialogClose,
  studentAnswers,
}) {
 
 
  return (
    <Dialog
      open={isDialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleDialogClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Are you sure you want to end the exam?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          You will not be able to change your answers after you end the exam.
        </DialogContentText>
        <Stack direction="row" gap={4}>
          <h1
            style={{
              color: "#187163",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Answered:{" "}
            {studentAnswers.filter((answer) => answer !== null).length}
          </h1>
          <h1
            style={{
              color: "#187163",
              fontSize: "20px",
              fontWeight: "bold",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            Unanswered:{" "}
            {studentAnswers.filter((answer) => answer == null).length}
          </h1>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: "#187163",
          }}
          onClick={handleDialogClose}
        >
          Cancel
        </Button>
        <Button
          sx={{
            color: "#187163",
          }}
          onClick={handleDialogClose}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
