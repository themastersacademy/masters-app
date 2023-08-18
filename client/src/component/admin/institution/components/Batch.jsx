import React, { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack,Button,SvgIcon } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";


export default function Batch({ batch,getRequestAccess }) {
    console.log(batch)
    const [list,setList] = useState(batch)
  const check = [];
  return (
    <div>
       {batch.studendList.length > 0
        ? batch.studendList.map((task, index) => {
            if (task.requirest == true) {
              check.push(task);
            
            }
          })
        : null}
      {check.length > 0 ? (
        <RequestList task={batch.studendList} getRequestAccess={getRequestAccess} />
      ) : (
        <div>No Requirest</div>
      )}
    </div>
  );
}





function RequestList({ task,getRequestAccess }) {
  

const handleCancel =(data) =>{
  getRequestAccess('remove',data)
}

  const style = {
    image: {
      width: "40px",
      height: " 40px",
    },
    name: {
      color: " ##000",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    rollNumber: {
      color: " ##000",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      lineHeight: "normal",
    },
    email: {
      color: " ##000",
      fontSize: "16px",
      fontStyle: "normal",
      fontWeight: "700",
      lineHeight: "normal",
    },
    remove:{
        width: "30px",
        height: "30px",
        color:'white',
        background: "#187163",
        cursor: 'pointer',
        textTransform:'none'
    },
    
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 ,borderCollapse: 'separate', borderSpacing: '20px' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Student</TableCell>
            <TableCell align="center" sx={{ width: "100px" }}>
              Department
            </TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center" sx={{ width: "150px" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {task.map((row, index) => 
          { 
            
  if(row.requirest == true)
  return (
            <TableRow
              key={index}
         
             style={{
              borderCollapse: 'separate',
             borderSpacing: '0px 4px'}}
            >
              <TableCell component="th" scope="row">
                <div style={{ display: "flex", gap: "10px" }}>
                  <img style={style.image} src={row.avatar} alt="" />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                    }}
                  >
                    <p style={style.name}>{row.name}</p>
                    <p style={style.rollNumber}>{row.rollNumber}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center">{row.dept}</TableCell>
              <TableCell align="center">
                <p style={style.email}>{row.email}</p>
              </TableCell>
              <TableCell align="center">


                <Button style={style.remove} onClick={()=>handleCancel(row)} >Remove</Button>
                {/* <Stack direction="row" spacing='10px' justifyContent='center' >
                
                  <SvgIcon onClick={()=>handleCancel(row)} style={style.deleteBtn} component={CloseIcon  } />
                  <SvgIcon onClick={()=>handleOk(row)} style={style.selectBtn} component={DoneIcon } />
                
                </Stack> */}
              </TableCell>
            </TableRow>
  )
                   }
                   )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
