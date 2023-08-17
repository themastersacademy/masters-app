import { Button, Icon, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SetQuestion from "./SetQuestion";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
 import { DatePicker } from "@mui/x-date-pickers/DatePicker";
 import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { useLocation } from "react-router-dom";
import AddTopic from "./AddTopic";
import dayjs from "dayjs";
import "../../../../App.css";
export default function ScheduleTest({
  setQuestion,
  question,
  details,
  setDetails,
  deleteBatchTopic,
  setChange,
  isChange,
  Notificate
}) {
   console.log(details)
  const [task, setTask] = useState([]);
  const { search } = useLocation();
  const id = search.split("=")[1];
  const getBank = () => {
  
     fetch("/api/admin/createBatechTopic",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({id:id})
     })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        if (data.status == "success") setTask(data.message)
      });

  };



  const saveChangeBatch = () =>{

    if(question.batchQues !== undefined){
 const check =[]
 question.batchQues.map(task => {
    if(task.level.easy == '' || task.level.medium == ''|| task.level.hard == '') check.push(task)
 })

    if(details.setMark == '0' || details.setMark == '') Notificate('info','Please set the Mark')
   else if(details.setTimeFrom  !== details.setTimeTo )  
 {
    if(check.length !== 0 ) Notificate('info','Please fill the level')
    // fetch('/api/admin/saveChangeBatch',{
    //     method:"POST",
    //     headers:{
    //         "Content-type":"application/json"
    //     },
    //     body:JSON.stringify({id:id,data:question.batchQues})
   
    // })
    // .then((res) => res.json())
    // .then((data) => {
    
    //   if (data.status == "success") console.log(data)
    // });
 }
else Notificate('info','Please check from time and to time')
}
  }

  const createBank = (data) => {
    console.log(data);
    fetch('/api/admin/selectBatchTopic',{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({id:id,topic:data})
    })   
    .then((res) => res.json())
    .then((data) => {
      console.log(data)
      setChange(!isChange)
  
    });
 
  };

  useEffect(()=>{
    getBank()
  },[isChange])
  return (
    <div>
     <Stack direction='row' sx={{marginTop:'10px'}}>
      <Button
           sx={{
            width: "100px",
            height: "30px",
            fontSize: "14px",
            background:  "#187163",
            color: "white",
            marginLeft:'auto',
            transformText: "lowercase",
            "&:hover": {
              backgroundColor:  "#185C52" 
            },
          
      }} 
      onClick={saveChangeBatch}
      >Save</Button> 
      </Stack> 
    {details.setMark !== undefined ? <SetDetailsExam  setDetails={setDetails} details={details} /> : null }  
      <div style={{ marginTop: "20px" }}>
        <AddTopic createBank={createBank} task={task} question={question} />
      </div>
      <div
        className="scrollHide"
        style={{ height: "60vh", overflowY: "scroll" }}
      >
        {question.batchQues !== undefined ? (

     question.batchQues.map((task,index) => {
       return question.avalibleQues.map((avalible,avalibleIndex) => {
            if(task.quesID == avalible._id )  
            {
                     return  <SetQuestion
                  deleteBatchTopic={deleteBatchTopic}
                  key={index}
                  task={task}
                  index={index}
                  avalible={avalible}
                  setQuestion={setQuestion}
                 
                
                />
            }  
    
        })
    })           
        ) : (
          <div
            style={{
              width: "100%",
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              fontWeight: "bold",
              color: "#CACACA",
            }}
          >
            {" "}
            Add Question{" "}
          </div>
        )}
      </div>
    </div>
  );
}

const SetDetailsExam = ({setDetails,details}) => {
  const [from, setFromValue] = useState(dayjs(`2022-04-17T${details.setTimeFrom}`));
  const [to, setToValue] =  useState(dayjs(`2022-04-17T${details.setTimeTo}`));
  const [date, setDate] = useState(new Date());
  const handleChange = (e) => {
    console.log(e.$d);
        const date = new Date(e.$d);
    var finaldate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
      setDetails((preValue)=>{
        const getValue = {...preValue}
        getValue.setDate = e.$d
        return getValue
      })
   
  };
  const handleFromTimeChange = (e) => {
  
    const date = new Date(e.$d);
    var  setTimeFrom = date.getHours() + ":" + date.getMinutes();

    console.log(`2022-04-17T${setTimeFrom}`);
   
    setDetails((preValue)=>{
        const getValue = {...preValue}
        getValue.setTimeFrom = setTimeFrom
        return getValue
      })
  };

  const handleToTimeChange =(e) =>{
    
    const date = new Date(e.$d);
    var setTimeTo = date.getHours() + ":" + date.getMinutes();

    console.log(`2022-04-17T${setTimeTo}`);
   
    setDetails((preValue)=>{
        const getValue = {...preValue}
        getValue.setTimeTo = setTimeTo
        return getValue
      })
  }

  const handleMark =(e) =>{
    if(e.target.value >= 0 )
    setDetails((preValue)=>{
        const getValue = {...preValue}
        getValue.setMark = e.target.value
        return getValue
      })

  }
  const handleNegative =(e) =>{
    console.log(date)
    if(e.target.value >= 0 )
    setDetails((preValue)=>{
        const getValue = {...preValue}
        getValue.setNegativeMark = e.target.value
        return getValue
      })
    
  }

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
          <MobileDatePicker
            label='select date'
            
             format="DD-MM-YYYY"
             defaultValue={details.setDate == '0' ? dayjs(date) :dayjs(new Date(details.setDate))}

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
            value={from}
          
            onChange={handleFromTimeChange}
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
           value={to}
            onChange={handleToTimeChange}
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
            value={details.setMark}
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
            onChange={handleMark}
          />

          <TextField
            type="Number"
            value={details.setNegativeMark}
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
            onChange={handleNegative}
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
