import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ScheduleTest from "./ScheduleTest";
import { useLocation } from "react-router-dom";
import History from './History'
import Notification from "../../../../util/Alert";
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
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [question, setQuestion] = useState({
    avalibleQues: [],
    batchQues:[]
   
    
  });
  const [details,setDetails] = useState({
    setDate:new Date(),
   setTimeFrom:'0:0',
    setTimeTo:'0:0',
    setMark:'',
   setNegativeMark:'0',
   setExamTitle:'',
   examDuration:'0'
  })
  const [value, setValue] = useState(0);
  const [isChange, setChange] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [history,setHistory] = useState([])
  const [notificate, setNotification] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteBatchTopic = () => {
  setChange(!isChange)
  };

  const getHistory = () =>{
    fetch("/api/admin/getHistory", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
    .then(res => res.json())
    .then((data) => { 
      console.log(data)
      if(data.status == 'ok')  setHistory(data.message)
     
    } ) 
  }

  useEffect(()=>{getHistory()},[])

  const Notificate =(status,message) =>{
    setSeverity(status)
    setMessage(message)
    setNotification(true)
  }

  return (
    <Paper
      sx={{
        width: "100%",
        height: "calc(100vh - 110px)",
        padding: "0 20px",
        margin: "20px 0",

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
          <Tab label="History" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div>ss</div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ScheduleTest
          question={question}
          setChange={setChange}
          isChange={isChange}
          deleteBatchTopic={deleteBatchTopic}
          setQuestion={setQuestion}
         details={details}
        setDetails={setDetails}
        Notificate={Notificate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>

       </CustomTabPanel>
       <CustomTabPanel value={value} index={3}>
      <History history={history} />
        </CustomTabPanel>
     <Notification 
       setNotification={setNotification}
       notificate={notificate}
       message={message}
       severity={severity}
     />
    </Paper>
  );
}
