import TopNavBar from "./components/TopNavBar";
import GoalCard from "./components/GoalCard";
import InstitutionCard from "./components/InstitutionCard";
import ScoreCard from "./components/ScoreCard";
import AnalysisCard from "./components/AnalysisCard";
import TestCard from "./components/TestCard";
import PracticeTest from "./components/PracticeTest";
import MockTest from "./components/MockTest";
import MDNavBar from "./components/MDNavBar";
import { Stack, Grid, Tab, Tabs, Paper } from "@mui/material";
import PropTypes from "prop-types";
import useWindowDimensions from "../../util/useWindowDimensions";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notification from "../../util/Alert";
export default function Layout() {
  const navigator = useNavigate();
  const { search } = useLocation();
  const id = search.split("=")[1];
  const { width } = useWindowDimensions();
  const [institute, setInstitue] = useState([]);
  const [user, setUser] = useState([]);
  const [goal, setGoal] = useState([]);
  const [getGoalId, setGoalId] = useState("");
  const [isChange, setChange] = useState(false);
  const [selectGoal, setSelectGoal] = useState("");
  const [details, setDetails] = useState({
    userID: id,
    instituteName: "",
    instituteID: "",
    rollNumber: "",
    Dept: "",
    batchCode: "",
  });
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [notificate, setNotification] = useState(false);
  const Notifications = (status, message) => {
    setSeverity(status);
    setMessage(message);
    setNotification(true);
  };

  const getInstitute = () => {
    fetch("/api/admin/getInstitute")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") setInstitue(data.message);
      });
  };
  const getUserDetails = () => {
    fetch("/api/user/getUserData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          setUser(data.message);
          setGoal(data.data);
          if (data.topic.courseId !== "") setSelectGoal(data.topic);
        }
      });
  };

  const addGoal = (goal) => {
    fetch("/api/user/addGoal", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id, goal }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") setChange(!isChange);
        Notifications(data.status, data.message);
      });
  };
  const createPracticesExam = (value, selectGoal) => {
    console.log(value, selectGoal);
    fetch("/api/exam/createPracticesExam", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id, value, selectGoal }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "success") {
          navigator(`/exam/info?=${data.examId}`);
        }
      });
  };
  useEffect(() => {
    if (getGoalId !== "") {
      fetch("/api/user/getViewGoal", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ getGoalId }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSelectGoal(data.topic);
        });
    }
  }, [getGoalId]);

  useEffect(() => {
    fetch("/isLogin")
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "isLogout") navigator("/login");
        if (data.status == "isExam" ) navigator("/exam/state");
        if (id == undefined) navigator("/login");
      });
    getInstitute();
    getUserDetails();
  }, [isChange]);

  return (
    <div>
      {width > 1024 ? (
        <DTView
          institute={institute}
          user={user}
          goal={goal}
          isChange={isChange}
          addGoal={addGoal}
          id={id}
          setGoalId={setGoalId}
          selectGoal={selectGoal}
          createPracticesExam={createPracticesExam}
          setSelectGoal={setSelectGoal}
          details={details}
          setDetails={setDetails}
          Notificate={Notifications}
        />
      ) : (
        <MoView
          institute={institute}
          user={user}
          goal={goal}
          id={id}
          setGoalId={setGoalId}
          addGoal={addGoal}
          isChange={isChange}
          selectGoal={selectGoal}
          createPracticesExam={createPracticesExam}
          setSelectGoal={setSelectGoal}
          details={details}
          setDetails={setDetails}
          Notificate={Notifications}
        />
      )}

      <Notification
        setNotification={setNotification}
        notificate={notificate}
        message={message}
        severity={severity}
      />
    </div>
  );
}

function DTView({
  id,
  institute,
  addGoal,
  setDetails,
  isChange,
  details,
  user,
  goal,
  selectGoal,
  setSelectGoal,
  Notificate,
  setGoalId,
  createPracticesExam,
}) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      sx={{
        width: "100%",
        padding: "30px 0px",
        backgroundColor: "#C5CFD3",
        minHeight: "100vh",
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        sx={{
          width: "100%",
          padding: "0px 20px",
          maxWidth: "1240px",
        }}
      >
        <TopNavBar user={user} />
        <Grid
          container
          width={"100%"}
          sx={{
            marginTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Grid item xs={6} paddingRight="10px">
            <GoalCard
              goal={goal}
              selectGoal={selectGoal}
              isChange={isChange}
              addGoal={addGoal}
              setGoalId={setGoalId}
              setSelectGoal={setSelectGoal}
              id={id}
            />
            {selectGoal !== "" ? (
              <TestCard
                selectGoal={selectGoal}
                setSelectGoal={setSelectGoal}
                Notificate={Notificate}
                createPracticesExam={createPracticesExam}
              />
            ) : null}
          </Grid>
          <Grid item xs={6} paddingLeft="10px">
            <InstitutionCard
              institute={institute}
              setDetails={setDetails}
              details={details}
              Notificate={Notificate}
            />
            <ScoreCard />
            <AnalysisCard />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
}

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
      color: "#187163",
      "&.Mui-selected": {
        color: "#FEA800",
      },
    },
  };
}

function MoView({
  institute,
  setDetails,
  details,
  Notificate,
  user,
  goal,
  isChange,
  addGoal,
  id,
  selectGoal,
  setSelectGoal,
  createPracticesExam,
  setGoalId,
}) {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <MDNavBar
        user={user}
        goal={goal}
        selectGoal={selectGoal}
        setSelectGoal={setSelectGoal}
        isChange={isChange}
        addGoal={addGoal}
        id={id}
        setGoalId={setGoalId}
      />
      <Stack
        overflow={"scroll"}
        sx={{
          width: "100%",
          padding: "0px 10px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          className="scrollHide"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: "#FEA800",
            },
            width: "fit-content",
            overflowX: "scroll",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tab label="Tests" {...a11yProps(0)} />
          <Tab label="Scorecard" {...a11yProps(1)} />
          <Tab label="Analysis" {...a11yProps(2)} />
          <Tab label="Institute" {...a11yProps(3)} />
          <Tab label="Subscribe" {...a11yProps(4)} />
        </Tabs>
      </Stack>
      <CustomTabPanel value={value} index={0}>
        {selectGoal.length !== 0 ? (
          <PracticeTest
            MD={true}
            goal={goal}
            selectGoal={selectGoal}
            setSelectGoal={setSelectGoal}
            Notificate={Notificate}
            createPracticesExam={createPracticesExam}
          />
        ) : null}
        <MockTest
          MD={true}
          goal={goal}
          selectGoal={selectGoal}
          setSelectGoal={setSelectGoal}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ScoreCard MD={true} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AnalysisCard MD={true} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <InstitutionCard
          MD={true}
          institute={institute}
          setDetails={setDetails}
          details={details}
          Notificate={Notificate}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        o
      </CustomTabPanel>
    </Paper>
  );
}
