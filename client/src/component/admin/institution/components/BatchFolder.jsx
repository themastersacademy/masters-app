import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ScheduleTest from "./ScheduleTest";
import { useLocation } from "react-router-dom";
import History from "./History";
import Notification from "../../../../util/Alert";
import { Stack } from "@mui/material";
import SvgIcon from '@mui/material/SvgIcon'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Requests from './Requests'
import Batch from "./Batch";
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
  const [head, setHead] = useState([]);
  const [question, setQuestion] = useState({
    avalibleQues: [],
    batchQues: [],
  });
  const [details, setDetails] = useState({
    setDate: new Date(),
    setTimeFrom: "0:0",
    setTimeTo: "0:0",
    setMark: "",
    setNegativeMark: "0",
    setExamTitle: "",
    examDuration: "0",
  });
  const [batch,setBatch] = useState([])
  const [value, setValue] = useState(0);
  const [isChange, setChange] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  const [notificate, setNotification] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deleteBatchTopic = () => {
    setChange(!isChange);
  };

  const getHistory = () => {
    fetch("/api/admin/getHistory", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          console.log(data);
        
          setHead(data.head);
   setBatch(data.message)
        }
      });
  };

  const getRequestAccess = (status,data) =>{
fetch('/api/admin/getRequestAccess',{
  method:"POST",
  headers:{
    "Content-type":"application/json"
  },
  body:JSON.stringify({ id,status,data})
}).then(res => res.json())
  .then(data => {
    getHistory()
    Notificate(data.status,data.message)

  })
  }

  useEffect(() => {
    getHistory();
  },[]);

  const Notificate = (status, message) => {
    setSeverity(status);
    setMessage(message);
    setNotification(true);
  };

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
      {head.avatar == undefined ? null : <BatchHead task={head} />}

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
        {batch.length !== 0 ? <Batch batch={batch} getRequestAccess={getRequestAccess} /> : null }
       
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
        <Requests batch={batch} getRequestAccess={getRequestAccess} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <History batch={batch} />
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

const BatchHead = ({ task }) => {
  const  text = task.batchCode
const clickCopy = () =>{
 
    navigator.clipboard.writeText(text);
 
}

  const style = {
    image: {
      width: "40px",
      height: " 40px",
    },
    title: {
      color: "#000",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    batchName:{
       marginLeft:'auto',
        color: " #FEA800",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
      },
    batchCode:{
      color: "#187163",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    copyIcon:{
      width: '15px',
height: '15px',
color:'#187163'
    }
  };

  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{padding:'10px'}}>
      <Stack direction='row' alignItems='center' spacing='15px'>
        <img src={task.avatar} style={style.image} alt="" />
        <p style={style.title} > {task.name} </p>
      </Stack>

      <Stack direction='column' justifyContent='center' spacing='10px'>
        <p style={style.batchName}>{task.batchName}</p>
        <Stack direction='row' alignItems='center'  spacing='5px'>
        <div  ><span>Batch code :</span> <span style={style.batchCode} >{task.batchCode}</span> </div> 

        <SvgIcon onClick={clickCopy}  sx={style.copyIcon} component={ FileCopyIcon  } />
        </Stack>
      </Stack>
    </Stack>
  );
};
