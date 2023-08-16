import { Paper } from "@mui/material";
import { TextField,Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function SetQuestion({
  task,
  index,
  setQuestion,
  setSelectQuestion,
  question,

}) {


  const [limit, setLimit] = useState({
    easy: false,
    medium: false,
    hard: false,
  });
  const handleChange = (e) => {
    setSelectQuestion(question)
   
  };
 
  const styleMock = {
    height:'56px',
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
    <div style={{ paddingTop: "30px" }}>
      <Paper
        sx={{
          width: "100%",
          height: "100px",
          boxShadow: "0 4px 6px rbga(0,0,0,0.25) ",
         padding:'15px',
          display: "flex",
      alignItems:'center',
          gap: "50px",
        
         
        }}
        key={index}
      >
       

        <TextField
          sx={styleMock}
          value={task.title}
          label="Topic"
          variant="outlined"
          disabled
       
        />
        

        <Stack direction='row' alignItems='center'  spacing='10px'>
          <TextField
            sx={styleMock}
            value={task.easy}
            helperText={`Avalible ${task.level.easy}`}
            error={limit.easy == false ? false : true}
            onChange={(e) => {
            
        
            if(0 <= e.target.value) {
              
              if (task.level.easy >= e.target.value) {
                setQuestion((preValue) => {
                  const getValue = [...preValue];
                  getValue[index].easy =e.target.value
                 return getValue;
                });

                handleChange();

                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.easy = false;
                  return limit;
                });
              } else { 
                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.easy = true;
                  return limit;
                });
              }
            }
          
            
            }}
            label="Easy"
            variant="outlined"
            type="number"
          
          />

          <TextField
            error={limit.medium == false ? false : true}
            sx={styleMock}
            value={task.medium}
            helperText={`Avalible ${task.level.medium}`}
            onChange={(e) => {
              if(0 <= e.target.value) {
              if (task.level.medium >= e.target.value) {
                setQuestion((preValue) => {
                  const getValue = [...preValue];
                  getValue[index].medium = e.target.value;
                 return getValue;
                });

                handleChange();

                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.medium = false;
                  return limit;
                });
              } else {
                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.medium = true;
                  return limit;
                });
              }
            }
            }}
            label="Medium"
            variant="outlined"
            type="number"
         
          />

          <TextField
            error={limit.hard == false ? false : true}
            sx={styleMock}
            value={task.hard}
            helperText={`Avalible ${task.level.hard}`}
            onChange={(e) => {
              if(0 <= e.target.value) {
              if (task.level.hard >= e.target.value) {
                setQuestion((preValue) => {
                  const getValue = [...preValue];
                  getValue[index].hard = e.target.value;
                 return getValue;
                });
                handleChange();
                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.hard = false;
                  return limit;
                });
              } else {
                setLimit((preValue) => {
                  const limit = { ...preValue };
                  limit.hard = true;
                  return limit;
                });
              }
            }
            }}
            label="Hard"
            variant="outlined"
            type="number"
      
          />
        </Stack>
       
      </Paper>
    </div>
  );
}
