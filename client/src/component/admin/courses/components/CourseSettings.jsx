import {
  TextField,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useEffect } from "react";
import RangeSlider from "./SlidePercentage";
export default function CourseSettings({
  courseSetting,
  setSetting,
  setPageController,
}) {

  useEffect(() => {
  
    setPageController({
      mockPage: false,
      courseSettingPage: true,
    });
  }, []);

  const CssTextField = {
    "& label.Mui-focused": {
      color: "#A0AAB4",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#B2BAC2",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#E0E3E7",
      },
      "&:hover fieldset": {
        borderColor: "#B2BAC2",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#6F7E8C",
      },
    },
  };
  const styleSetting = {
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
        borderColor: "187163",
      },
    },
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "50px" }}>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div>
          <TextField
            type="number"
            value={courseSetting.mark}
            onChange={(e) => {
              setSetting((preValue) => {
                const getValue = { ...preValue };
                getValue.mark = e.target.value;
                return getValue;
              });
            }}
            label="Mark per question"
            variant="outlined"
            sx={styleSetting}
          />
        </div>
        <div>
          <TextField
            type="number"
            value={courseSetting.negativeMark}
            onChange={(e) => {
              setSetting((preValue) => {
                const getValue = { ...preValue };
                getValue.negativeMark = e.target.value;
                return getValue;
              });
            }}
            sx={styleSetting}
            label="Negative Mark per question"
            variant="outlined"
          />
        </div>
        <div>
          <FormControl sx={styleSetting} variant="outlined">
            <InputLabel>Duration in mins</InputLabel>
            <OutlinedInput
              type="number"
              value={courseSetting.duration}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position="start">
                  <IconButton edge="end">
                    <RemoveIcon />
                  </IconButton>
                </InputAdornment>
              }
              onChange={(e) => {
                setSetting((preValue) => {
                
                  const getValue = { ...preValue };
                  getValue.duration = e.target.value;
                  return getValue;
                });
              }}
              label="Duration in mins"
            />
          </FormControl>
        </div>
      </div>
      <div>
        <label htmlFor="">Set the medium percentage</label>
        <RangeSlider setSetting={setSetting} courseSetting={courseSetting} />
      </div>
    </div>
  );
}
