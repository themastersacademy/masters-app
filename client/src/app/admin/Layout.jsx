import React, { useState } from "react";
import SideNavBar from "../../component/admin/SideNavBar";
import Avatar from "@mui/material/Avatar";
import QuestionBank from "./QuestionBanks/Page";
import Courses from "./Courses/Page";
import Course from "../../component/admin/courses/Course";
import Manage from "./ManageUser/Page";
import Institution from "./Institution/Page";
import Analytics from "./Analytics/Page";
import Collection from "../../component/admin/questionBank/Collection";
import Image from "../../util/Avater";
import CreateQuestionBank from "../../component/admin/questionBank/CreateQuestionBank";
import CreateCourses from "../../component/admin/courses/components/CreateCourses";
import { useEffect } from "react";
import useWindowDimensions from "../../util/useWindowDimensions";
import Display from "../../util/display";
import Notification from "../../util/Alert";
import BatchFolder from "../../component/admin/institution/components/BatchFolder";
import InstitutePage from "../../component/admin/institution/components/institutePage";
function Dashboard() {

  const pathName = window.location.pathname;
  const { width } = useWindowDimensions();
  const [isNotify,setNotify] = useState(false)
  const [bank, setBank] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [notificate, setNotification] = useState(false);

  useEffect(() => {
    getBank();
    getCourse()
  },[notificate]);
  useEffect(()=>{
 
    getCourse()
  },[isNotify])

  const getBank = () => {
    fetch("/api/admin/getBank")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setBank(data.message);
        }
      });
  };

  const getCourse = () => {
    fetch("/api/admin/getCourse")
    .then((res) => res.json())
    .then((data) => {
     
      if (data.status === "ok") {
        setCourseList(data.message);
      }
    });
  }

  const createCourse = (data) => {
    fetch('/api/admin/createCourse',{
      method:"POST",
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({title:data})
    })
    .then( res => res.json())
    .then((data)=> {

        setMessage(data.message);
        setSeverity(data.status);
        setNotification(true);

        if(data.status == "success") getCourse()
    
    })
  }
 

  const createBank = (data) => {
    if (data !== "") {
      fetch("/api/admin/createBank", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ title: data }),
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.message);
          setSeverity(data.status);
          setNotification(true);
          if (data.status === "success") getBank();
        });
    } else {
      setMessage("Please enter bank name");
      setSeverity("warning");
      setNotification(true);
    }
  };
  const ControlNotification = (status,message) => {
    setMessage(message);
    setSeverity(status);
    setNotification(true);
  }
  const styles = {
    navbar: {
      display: "flex",
      gap: "20px",
      width: "100%",
      height: "70px",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    navChild: {
      marginLeft: "auto",
      display: "flex",
      gap: "20px",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        position: "fixed",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <SideNavBar />
      <Notification
        setNotification={setNotification}
        notificate={notificate}
        message={message}
        severity={severity}
      />
      <div
        style={{
          width: "calc(100% - 280px)",
          height: "calc(100vh - 70px)",
          padding: "0 30px",
        }}
      >
        <div style={styles.navbar}>
          {pathName === "/admin/dashboard" ? <CreateCourses createBank={createCourse} /> : null}
          {pathName === "/admin/bank" ? (
            <div>
              <CreateQuestionBank createBank={createBank} />
            </div>
          ) : null}
          <Avatar src={Image.student} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%" }}>
            {pathName === "/admin/dashboard" ? (
              <Courses courseList={courseList} isNotify={isNotify} setNotify={setNotify}  />
            ) : null}
            {pathName === "/admin/bank" ? <QuestionBank bank={bank} /> : null}
            {pathName === "/admin/analytics" ? <Analytics /> : null}
            {pathName === "/admin/institution" ? <Institution ControlNotification={ControlNotification} /> : null}
            {pathName === "/admin/manage" ? <Manage /> : null}
            {pathName === "/admin/dashboard/course" ? <Course ControlNotification={ControlNotification} isNotify={isNotify} setNotify={setNotify} /> : null}
            {
              pathName === "/admin/bank/collection" ?   width > 1024 ?  (
                <Collection />
              ) : <Display /> : null
            }


             {
              pathName === "/admin/institution/page" ?  (
                <InstitutePage ControlNotification={ControlNotification} />
              ) : null
            }

       
            {pathName ==='/admin/institution/page/batch' ? <BatchFolder /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
