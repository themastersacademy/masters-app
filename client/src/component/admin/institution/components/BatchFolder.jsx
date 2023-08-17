import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import ScheduleTest from "./ScheduleTest";
import { useLocation } from "react-router-dom";
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
  const [question, setQuestion] = useState([]);
  const [details,setDetails] = useState({})
  const [value, setValue] = useState(0);
  const [isChange, setChange] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [notificate, setNotification] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getBatchTopic = () => {
    fetch("/api/admin/getBatchTopic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          console.log(data);
          setQuestion({
            avalibleQues: data.avalibleQues,
            batchQues: data.batchQues,
          });
          setDetails(data.details)
        }
      });
  };
  const deleteBatchTopic = (data) => {
    fetch("/api/admin/deleteBatchTopic", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id, deleteID: data.quesID }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          console.log(data);
          setChange(!isChange);
        }
      });
  };

  useEffect(() => {
    getBatchTopic();
  }, [isChange]);

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
      <CustomTabPanel value={value} index={2}></CustomTabPanel>
     <Notification 
       setNotification={setNotification}
       notificate={notificate}
       message={message}
       severity={severity}
     />
    </Paper>
  );
}
