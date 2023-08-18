import Avater from "../../../util/Avater";
import {
  Paper,
  Accordion,
  AccordionSummary,
  Button,
  Stack,
  Autocomplete,
  TextField,
  
} from "@mui/material";


import { useEffect, useState, } from "react";

export default function InstitutionCard({
  MD,
  institute,
  setDetails,
  details,
  Notificate
}) {
  const [expanded, setExpanded] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
  const handleSelect = (event, value) => {
    if(value !== null)
    setDetails((preValue) => {
      const getValue = { ...preValue };
      getValue.instituteName = value.label;
      getValue.instituteID = value.id;
      return getValue;
    });
  };
  const handleRoll = (e) => {
    setDetails((preValue) => {
      const getValue = { ...preValue };
      getValue.rollNumber = e.target.value;

      return getValue;
    });
  };
  const handleDept = (e) => {
    setDetails((preValue) => {
      const getValue = { ...preValue };
      getValue.Dept = e.target.value;

      return getValue;
    });
  };
  const handleBatchCode = (e) => {
    setDetails((preValue) => {
      const getValue = { ...preValue };
      getValue.batchCode = e.target.value;

      return getValue;
    });
  };

  const handleSubmit = () =>{
    console.log(details)
    fetch('/api/user/requirest',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({data:details})
    })
    .then(res => res.json())
    .then((data) => {
    Notificate(data.status,data.message)
    }
    )
  }
  useEffect(() => {
    if (
      details.Dept !== "" &&
      details.batchCode !== "" &&
      details.instituteID !== "" &&
      details.instituteName !== "" &&
      details.rollNumber !== ""
    ) setSubmit(true)
    else setSubmit(false)
  },[details]);
  return (
    <Paper
      elevation={MD ? 0 : 3}
      sx={{
        borderRadius: "20px",
        overflow: "hidden",
      }}
    >
      <Accordion expanded={MD ? true : expanded}>
        <AccordionSummary
          sx={{
            borderRadius: "20px 20px 0 0",
            padding: "10px 20px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <h2
              style={{
                fontSize: MD ? "18px" : "20px",
                fontWeight: "500",
              }}
            >
              {MD ? "Join an Institution" : "Click here to Join an Institution"}
            </h2>
            {MD ? null : (
              <Button
                variant="contained"
                onClick={handleClick}
                sx={{
                  textTransform: "none",
                  backgroundColor: !expanded ? "#187163" : "red",
                  color: "#fff",
                  "&:hover": {
                    backgroundColor: !expanded ? "#187163" : "red",
                    color: "#fff",
                  },
                  zIndex: "1",
                }}
              >
                {!expanded ? "Tap to Join" : "Close"}
              </Button>
            )}
          </Stack>
          <img
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              zIndex: "0",
            }}
            src={Avater.cardBg}
            alt=""
          />
        </AccordionSummary>
        <Stack padding={3}>
          <Autocomplete
            disablePortal
            options={institute}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                sx={{
                  "& label.Mui-focused": {
                    color: "#187163",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#187163",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#187163",
                    },
                    "&:hover fieldset": {
                      borderColor: "#187163",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#187163",
                    },
                  },
                }}
                label="Institution Name"
                placeholder="Enter Institution name"
              />
            )}
          />
          <Stack direction="row" gap={2} marginTop={2}>
            <TextField
              fullWidth
              sx={{
                "& label.Mui-focused": {
                  color: "#187163",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#187163",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#187163",
                  },
                  "&:hover fieldset": {
                    borderColor: "#187163",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "blue",
                  },
                },
              }}
              onChange={handleRoll}
              label="Roll Number"
              placeholder="Enter Roll Number"
            />
            <TextField
              fullWidth
              sx={{
                "& label.Mui-focused": {
                  color: "#187163",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#187163",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#187163",
                  },
                  "&:hover fieldset": {
                    borderColor: "#187163",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#187163",
                  },
                },
              }}
              onChange={handleDept}
              label="Department"
              placeholder="Enter Department"
            />
            <TextField
              fullWidth
              sx={{
                "& label.Mui-focused": {
                  color: "#187163",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#187163",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#187163",
                  },
                  "&:hover fieldset": {
                    borderColor: "#187163",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#187163",
                  },
                },
              }}
              onChange={handleBatchCode}
              label="Batch Code"
              placeholder="Enter Batch Code"
            />
          </Stack>
          <Stack direction="column" alignItems={"center"} marginTop={2}>
            <Button
              variant="contained"
              disabled={isSubmit == true ? false : true}
              fullWidth={MD ? true : false}
              sx={{
                textTransform: "none",
                backgroundColor: "#187163",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#187163",
                  color: "#fff",
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Accordion>
    </Paper>
  );
}
