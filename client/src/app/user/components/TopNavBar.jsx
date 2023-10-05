import {
  Button,
  Stack,
  Paper,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import Avater from "../../../util/Avater";
import PlanChip from "./PlanChip";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TopNavBar({user}) {

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
  return (
    <Paper
      sx={{
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        height:'80px',
        padding: "20px 30px",
        borderRadius: "20px",
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }}
    >
    
        <Stack direction="row" spacing={2} alignItems="center">
          <img src={Avater.LOGO} />
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            The <font color="#FEA800">Masters Academy</font>
          </h1>
        </Stack>
        <Stack direction="row" spacing={4} alignItems="center">
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#187163",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#187163",
                color: "#fff",
              },
            }}
          >
            Upgrade to PRO
          </Button>

          <PlanChip plan="Free" />
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
                width: "50px",
                height: "50px",
              }}
              src={user.avatar}
            />
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleClose} sx={{display:'flex',gap:'10px'}}>
              <Avatar src={user.avatar} />
                   {user.name}
            </MenuItem>
            
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Stack>
    
    </Paper>
  );
}
