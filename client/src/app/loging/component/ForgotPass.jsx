import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import validator from "validator";
import PasswordChecklist from "react-password-checklist";
import useWindowDimensions from "../../../util/useWindowDimensions";
function ForgotPass({ controlNotification }) {
  const { width } = useWindowDimensions();
  const [passValidation, setpassValidation] = useState(false);
  const [getDetails, setDetails] = useState({ email: "", password: "" });
  const navigator = useNavigate();
  const signup = () => {
    if (
      getDetails.email !== "" &&
      getDetails.password !== "" &&
      passValidation == true
    ) {
      if (validator.isEmail(getDetails.email)) {
        fetch("/api/user/forgotPass", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: getDetails.email,
            password: getDetails.password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            controlNotification(data.status, data.message);
            if (data.status == "success") navigator("/login/verify");
          });
      } else {
        controlNotification("info", "Enter valid Email!");
      }
    } else controlNotification("info", "Please fill the details");
  };

  return (
    <Paper
      sx={{
        borderRadius: "7px",
        background: "#FFF",
        boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.15)",
        width: "423px",
        height: "500px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...(width < 1000 && {
          width: "80%",
             height: "600px",
        }),
      }}
    >
      <Stack direction="column" width="80%" spacing="15px" height="85%">
        <Stack direction="column" spacing="10px">
          <h1>Change Password</h1>
        </Stack>
        <Stack direction="column" spacing="10px">
          <label htmlFor="">Email</label>
          <TextField
            id="outlined-basic"
            label="Enter your Email"
            variant="outlined"
            onChange={(e) =>
              setDetails((preValue) => {
                const getValue = { ...preValue };
                getValue.email = e.target.value;
                return getValue;
              })
            }
          />
        </Stack>
        <Stack direction="column" spacing="10px">
          <label htmlFor="">Change password</label>
          <TextField
            id="outlined-basic"
            label="Enter your password"
            variant="outlined"
            type="password"
            onChange={(e) =>
              setDetails((preValue) => {
                const getValue = { ...preValue };
                getValue.password = e.target.value;
                return getValue;
              })
            }
          />
            <PasswordChecklist 
              rules={["minLength", "specialChar", "number", "capital"]}
              minLength={5}
              value={getDetails.password}
              onChange={(isValid) => {
                setpassValidation(isValid);
              }}
            />
      
        </Stack>
        <Button
          style={{
            borderRadius: "4px",
            width: "100%",
            color: "white",
            // marginTop:'auto',
            background: "#187163",
          }}
          onClick={signup}
        >
          Submit
        </Button>
      </Stack>
    </Paper>
  );
}

export default ForgotPass;
