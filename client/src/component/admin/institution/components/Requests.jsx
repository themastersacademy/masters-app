import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
export default function Requests({ batch }) {
  const check = [];
  return (
    <div>
      {batch.studendList.length > 0
        ? batch.studendList.map((task, index) => {
            if (task.requirest == false) {
              check.push(task);
              console.log(task);
            }
          })
        : null}
      {check.length > 0 ? (
        <RequestList task={batch.studendList} />
      ) : (
        <div>No Requirest</div>
      )}
    </div>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

function RequestList({ task }) {
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
    selectBtn:{
        width: "30px",
        height: "30px",
        background: "##18716330",
        
    },
    deleteBtn: {
      width: "30px",
      height: "30px",
      background: "#F33B1233",
    },
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
          {task.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                <Stack direction="row" spacing='10px'>
                  <Button
                    style={style.selectBtn}
                    startIcon={<DoneIcon sx={{color:'#187163'}} />}
                  ></Button>
                  <Button style={style.deleteBtn} startIcon={<CloseIcon sx={{color:'#F33B12'}} />}>
                    {" "}
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
