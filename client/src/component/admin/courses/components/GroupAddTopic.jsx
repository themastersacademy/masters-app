import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import {  IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import AddOption from "./AddOption";
export default function GroupAddTopic({ createTopic,task }) {
//   const [task,setTask] = useState([])
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState("");

  const getCourse = () => {
    // fetch("/api/admin/getBank")
    // .then((res) => res.json())
    // .then((data) => {
    //   console.log(data)
    //   if (data.status === "ok") {
    //  setTask(data.message)
    //   }
    // });
  }
  
  useEffect(()=>{
    getCourse()
  },[])
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const getGroupName = (task) => {
    setGroupName(task)
  };
  const submit = () => {
    createTopic(groupName);
    setGroupName("");
    setOpen(false);
  };

  return (
    <div style={{display:'inline-block'}}>
        <IconButton onClick={handleClickOpen}>
     <AddIcon />
     </IconButton>
      <Dialog fullWidth maxWidth="sm"  open={open} >
        <DialogTitle sx={{ background: " #187163;", color: "white" }}>
          Add Topic
        </DialogTitle>
        <DialogContent  >
        <AddOption task={task} getGroupName={getGroupName} /> 
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#187163" }} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={groupName === "" ? true : false}
            sx={{ color: "#187163" }}
            onClick={submit}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
