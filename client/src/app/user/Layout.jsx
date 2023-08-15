import TopNavBar from "./components/TopNavBar";
import GoalCard from "./components/GoalCard";
import InstitutionCard from "./components/InstitutionCard";
import ScoreCard from "./components/ScoreCard";
import AnalysisCard from "./components/AnalysisCard";
import TestCard from "./components/TestCard";
import PracticeTest from "./components/PracticeTest";
import MockTest from "./components/MockTest";
import MDNavBar from "./components/MDNavBar";
import { Stack, Grid, Tab, Tabs, Box, Paper } from "@mui/material";
import PropTypes from "prop-types";
import useWindowDimensions from "../../util/useWindowDimensions";
import { useState } from "react";

export default function Layout() {
  const { width } = useWindowDimensions();
  return width > 1024 ? <DTView /> : <MoView />;
}

function DTView() {
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
        <TopNavBar />
        <Grid
          container
          width={"100%"}
          sx={{
            marginTop: "20px",
            maxWidth: "1200px",
          }}
        >
          <Grid item xs={6} paddingRight="10px">
            <GoalCard />
            <TestCard />
          </Grid>
          <Grid item xs={6} paddingLeft="10px">
            <InstitutionCard />
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

function MoView() {
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
      <MDNavBar />
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
        <PracticeTest MD={true}/>
        <MockTest MD={true}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ScoreCard MD={true}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AnalysisCard MD={true}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <InstitutionCard MD={true}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        o
      </CustomTabPanel>
    </Paper>
  );
}
