import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchBar from "./Searchbar";
import { Button, Paper, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBatch from "./AddBatch";
import Image from "../../../../util/Avater";
import { SvgIcon } from "@mui/material";
import '../../../../App.css'
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
export default function InstitutePage({ ControlNotification }) {
  const { search } = useLocation();
  const id = search.split("=")[1];
  const [institute, setInstitute] = useState([]);
  const getInstitution = () => {
    fetch("/api/admin/getInstitution", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "success") setInstitute(data.message);
      });
  };

  useEffect(() => {
    getInstitution();
  }, []);
  return (
    <div>
      <SearchBar />
      <Stack sx={{ marginTop: "20px" }}>
        {institute.length > 0 ? (
          ""
        ) : (
          <Home
            institute={institute}
            id={id}
            ControlNotification={ControlNotification}
          />
        )}
      </Stack>
    </div>
  );
}

const Home = ({ institute, id, ControlNotification }) => {
  console.log(institute);
  const style = {
    image: {
      width: " 40px",
      height: " 40px",
    },
    name: {
      color: " #000",
      fontFamily: " DM Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    addBtn: {
      color: "white",
      borderRadius: " 4px",
      background: " #187163",
      minWidth: "118px",
      height: "34px",
      textTransform: "none",
    },
    batch: {
      color: " #000",
      fontFamily: " DM Sans",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
      marginTop: "20px",
    },
  };
  return (
    <Paper
      sx={{
        borderRadius: "5px",
        background: "#FFF",
        boxShadow: "0px 15px 62px 0px rgba(0, 0, 0, 0.08)",
        width: "100%",
        height: "600px",
        
        padding: "20px",
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing="15px">
          <img src={institute.avatar} style={style.image} alt="" />
          <p style={style.name}>{institute.name}</p>
        </Stack>
        <Stack direction="row" alignItems="center" spacing="15px">
          <Button startIcon={<AddIcon />} style={style.addBtn}>
            Add Teacher
          </Button>
          <AddBatch id={id} ControlNotification={ControlNotification} />
        </Stack>
      </Stack>
      <p style={style.batch}>Active Batches</p>
      <div className="scrollHide" style={{height:'450px',overflow:'scroll',padding:'10px'}}>
      <div style={{ marginTop: "20px", display :'flex',flexWrap:'wrap',gap:'10px' }}>
        {institute.batch == undefined
          ? null
          : institute.batch.map((task, index) => (
              <Batch task={task} key={index} />
            ))}
      </div>
      </div>
    </Paper>
  );
};

const Batch = ({ task }) => {
  const navigator = useNavigate()
const RieDirect = () =>{
 navigator(`/admin/institution/page/batch?=${task.batchID}`)
}

  const style = {
    image: {
      width: " 46px",
      height: "44px",
    },
    name:{
        color: " #000",
        fontFamily: " DM Sans",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: "700",
        lineHeight: "normal",
    }
  };

  return (
    <Paper
      sx={{
        width: "290px",
        height: "70px",
        borderRadius: "5px",
        background: "#FFF",
        padding:'10px',
        boxShadow: " 0px 15px 62px 0px rgba(0, 0, 0, 0.08)",
        cursor:'pointer'
      }}
      onClick={RieDirect}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing='10px'>
          <img src={Image.FileImage} style={style.image} alt="" />
          <p style={style.name}>{task.name}</p>
        </Stack>
        <SvgIcon component={ArrowForwardIosIcon} sx={{color:'#187163'}} />
      </Stack>
    </Paper>
  );
};
