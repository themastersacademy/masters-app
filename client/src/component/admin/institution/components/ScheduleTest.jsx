import { Icon, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SetQuestion from "./SetQuestion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import AddTopic from "./AddTopic";
import dayjs from "dayjs";
import '../../../../App.css'
export default function ScheduleTest({
  setQuestion,
  question,
  setSelectQuestion,
  selectQuestion,
}) {
  const [task, setTask] = useState([]);

  const getBank = () => {
    fetch("/api/admin/getBank")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") setTask(data.message);
      });
  };

  useEffect(() => {
    getBank();
  }, []);

  const createBank = (data) => {
    console.log(data)
    data.easy = '0'
      data.medium = '0'
      data.hard = '0'
      console.log(data)
    setQuestion((preValue) => {
      const getValue = [...preValue];
      
     
      getValue.push(data)
      return getValue;
    });
  };
  return (
    <div>
      <SetDetailsExam />
      <div style={{marginTop:'20px'}}>
      <AddTopic createBank={createBank} task={task} />
      </div>
      <div className="scrollHide" style={{height:'60vh',overflowY:'scroll'}} >

   
      {question.length > 0
        ? question.map((task, index) => (
            <SetQuestion
            key={index}
              task={task}
              index={index}
              setQuestion={setQuestion}
              setSelectQuestion={setSelectQuestion}
              question={question}
            />
          ))
        : null}
           </div>
    </div>
  );
}

const SetDetailsExam = () => {
  const [value, setValue] = useState(dayjs("2022-04-17T15:30"));

  const handleChange = (e) => {
    const date = new Date(e.$d);
    var finaldate =
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    console.log(finaldate);
  };
  const handleTimeChange = (e) => {
    console.log(e.$d);
    const date = new Date(e.$d);
    var finaldate = date.getHours() + "-" + date.getMinutes();

    console.log(`2022-04-17T${finaldate}`);
    setValue(dayjs(`2022-04-17T${finaldate}`));
  };
  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={[]}
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "10px",
            alignItems: "center",
            overflow: "hidden",

            "::-webkit-scrollbar": {
              display: "none",
            },
            "@media (min-width: 580px)": {
              flexDirection: "row",
              overflowX: "scroll",
              alignItems: "center",
              webkitAlignItems: "center",
              webkitFlexDirection: "row",
              webkitBoxAlign: "center",
            },
          }}
        >
          <DatePicker
            label="Select date"
            sx={{
              width: "100%",
              background: "#FFF",
              "&:hover fieldset": {
                border: "1px solid #187163!important",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                border: "1px solid #187163!important",
              },
            }}
            onChange={handleChange}
          />

          <TimePicker
            label="Time from"
            value={value}
            defaultValue={dayjs("2022-04-17T15:30")}
            onChange={handleTimeChange}
            sx={{
              width: "100%",
              background: "#FFF",
              "&:hover fieldset": {
                border: "1px solid #187163!important",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                border: "1px solid #187163!important",
              },
            }}
          />
          <TimePicker
            label="Time to"
            defaultValue={dayjs("2022-04-17T15:30")}
            onChange={handleTimeChange}
            sx={{
              background: "#FFF",
              "&:hover fieldset": {
                border: "1px solid #187163!important",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                border: "1px solid #187163!important",
              },
            }}
          />
          <TextField
            type="Number"
            sx={{
              width: "100%",
              background: "#FFF",
              "&:hover fieldset": {
                border: "1px solid #187163!important",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                border: "1px solid #187163!important",
              },
            }}
            label="Mark per question"
            placeholder="Enter Mark"
          />

          <TextField
            type="Number"
            sx={{
              width: "100%",
              background: "#FFF",
              "&:hover fieldset": {
                border: "1px solid #187163!important",
              },
              "&:focus-within fieldset, &:focus-visible fieldset": {
                border: "1px solid #187163!important",
              },
            }}
            label="Negative mark "
            placeholder="Enter Mark"
          />
        </DemoContainer>
      </LocalizationProvider>
    </Stack>
  );
};

// const AddTopic =() =>{
// return(
//     <AddTopic />
// )
// }
