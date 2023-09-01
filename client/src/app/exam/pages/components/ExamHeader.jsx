import { Paper, Stack, Avatar, Button } from "@mui/material";
import Avater from "../../../../util/Avater";
import {
  Menu,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useWindowDimensions from "../../../../util/useWindowDimensions";
export default function ExamHeader({ isMobileView }) {
  const {width} =useWindowDimensions()
  const navigete = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
   
    setAnchorEl(null);
  };
  const handleLogout = () =>{
    fetch('/logout')
    .then( res => res.json())
    .then(data =>{
      if(data.status == 'logout') navigete('/login')
    })
  }

  const handleHome = () =>{
    navigete('/login')
  }
  return (
    <Paper
      elevation={2}
      sx={{
        width: "100%",
        height:  width < 500 ? '60px' : "70px" ,
        borderRadius: "20px",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          //padding: isMobileView ? "10px 15px" :"10px 30px",
          padding :  width < 500 ? '10px' : "15px" 
        }}
      >
        <Stack direction="row" gap={isMobileView ? 1 : 2} alignItems="center">
          <img
            src={Avater.LOGO}
            alt="Avatar"
            width={isMobileView ? "40px" : "auto"}
          />
          <h1
            style={{
              fontWeight: "500",
              fontSize: width < 500 ? "15px" : "14px",
            }}
          >
            The <font color="#FEA800">Masters Academy</font>
          </h1>
        </Stack>
        <Avatar
          sx={{
            width: width < 500 ? '40px' : "50px" ,
            height:  width < 500 ? '40px' : "50px" ,
          }}
        >
           <Button
            d="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            sx={{
              borderRadius: "50%",
              padding: "0px",
              minWidth: "0px",
            }}
          >
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
              }}
              src=''
            />
          </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleHome}>
              {/* <Avatar src='' /> */}
                   Home
            </MenuItem>
            
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Avatar>
      </Stack>
    </Paper>
  );
}
