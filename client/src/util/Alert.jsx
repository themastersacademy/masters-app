import * as React from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function Notification({ setNotification, notificate, message, severity }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <Collapse in={notificate}>
      <Alert
        sx={{
          position: "absolute",
          top: 80,
          right: 40,
          zIndex: 9999,
          width: 400,
          height: 100,
        }}
        severity={!severity ? "success" : severity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setNotification(false)
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
      >
        <AlertTitle>{capitalizeFirstLetter(severity)}</AlertTitle>
        <div>{message}</div>
      </Alert>
    </Collapse>
  );
}
export default Notification;
