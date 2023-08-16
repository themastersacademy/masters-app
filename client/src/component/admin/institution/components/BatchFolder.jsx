import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ScheduleTest from "./ScheduleTest";
function CustomTabPanel(props) {

  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    sx: {
      textTransform: "none",
      color: "black",
      "&.Mui-selected": {
        color: "#FEA800",
      },
    },
  };
}


export default function BatchFolder({}) {

    const [question,setQuestion] = useState([])
    const [selectQuestion,setSelectQuestion] = useState([])
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
  return (
 
    <Paper
      sx={{
        width: "100%",
        height: "calc(100vh - 110px)",
        padding: "0 20px",
        margin: "20px 0",
        overflowY:"scroll",
        "::-webkit-scrollbar": {
            display: "none",
          },
      }}

    >
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FEA800",
            },
          }}
        >
          <Tab label="Batch" {...a11yProps(0)} />
          <Tab label="Schedule Test" {...a11yProps(1)} />
          <Tab label="Requests" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <div>ss</div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ScheduleTest question={question} setQuestion={setQuestion} selectquestion={selectQuestion} setSelectQuestion={setSelectQuestion} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2} >
    
      </CustomTabPanel>
   
   

    </Paper>
 
  );
}
