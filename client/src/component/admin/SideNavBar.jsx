import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../util/Avater";
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import InsertChartRoundedIcon from '@mui/icons-material/InsertChartRounded';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GroupsIcon from '@mui/icons-material/Groups';
import MenuBookIcon from "@mui/icons-material/MenuBook";
import useWindowDimensions from "../../util/useWindowDimensions";
import '../../App.css'
export default function SideNavBar() {
  const { width } = useWindowDimensions();
  const navicate = useNavigate();
  const style = {
    navbar: {
      display: "flex",
      width: "100%",
      alignItems: "center",
      height: "70px",
    },
    navChild: {
      marginLeft: "auto",
      marginRight: "20px",
      display: "flex",
      gap: "20px",
    },
    Aside: {
      width: "300px",
      height: "100vh",
      padding: "30px 0px 0px 10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0px 4px 16px rgba(0,0,0,0.25)",
    },
    asideTD: {
      width: "280px",
      height: "100vh",
      paddingTop: "30px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0px 4px 16px rgba(0,0,0,0.25)",
    },
    option: {
      width: "90%",
      height: "100vh",
      paddingTop: "30px",
      display: "flex",
      flexDirection: "column",
      gap: "50px",
    },
    optionChild: {
      display: "flex",
      marginRight: "30px",
      fontSize: "18px",
      color: "#187163",
      fontWeight: "bold",
      gap: "40px",
      alignItems: "center",
      cursor: "pointer",
    },
  };
  return (
    <div style={width > 1150 ? style.Aside : style.asideTD} 
    
    >
      <div style={style.option}  >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            
          }}
        >
          <img src={Image.LOGO} alt="" />
          <h1
            style={{
              fontSize: "16px",
              color: "#FEA800",
            }}
          >
            <font color="#187163">The</font> Masters Academy
          </h1>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}   >
          <div
            style={style.optionChild}
            className="sideNavHover"
            onClick={() => {
              navicate("/admin/dashboard");
            }}
          >
            <MenuBookIcon
              sx={{
                fontSize: 28,
              }}
            />
            <p>Courses</p>
          </div>

          <div
            style={style.optionChild}
            className="sideNavHover"
            onClick={() => {
              navicate("/admin/bank");
            }}
          >
            <InsertDriveFileIcon sx={{ fontSize: 28 }} />
            <p>Question Bank</p>
          </div>

          <div
            style={style.optionChild}
            className="sideNavHover"
            onClick={() => {
              navicate("/admin/manage");
            }}
          >
            <GroupsIcon sx={{ fontSize: 28 }} />
            <p>Manage User</p>
          </div>

          <div
            style={style.optionChild}
            className="sideNavHover"
            onClick={() => {
              navicate("/admin/analytics");
            }}
          >
            <InsertChartRoundedIcon sx={{ fontSize: 28 }} />
            <p>Analytics</p>
          </div>

          <div
            style={style.optionChild}
            className="sideNavHover"
            onClick={() => {
              navicate("/admin/institution");
            }}
          >
            <AccountBalanceIcon sx={{ fontSize: 28 }} />
            <p>Institution</p>
          </div>
        </div>
      </div>
    </div>
  );
}
