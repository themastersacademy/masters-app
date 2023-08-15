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
import { useState } from "react";

export default function InstitutionCard({ MD }) {
  const [expanded, setExpanded] = useState(false);
  const handleClick = () => {
    setExpanded(!expanded);
  };
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
            options={[
              "Institution 1",
              "Institution 2",
              "Institution 3",
              "Institution 4",
              "Institution 5",
            ]}
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
              label="Batch Code"
              placeholder="Enter Batch Code"
            />
          </Stack>
          <Stack direction="column" alignItems={"center"} marginTop={2}>
            <Button
              variant="contained"
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
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Accordion>
    </Paper>
  );
}
