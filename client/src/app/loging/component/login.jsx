import React, { useEffect, useState } from 'react'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';

import useWindowDimensions from '../../../util/useWindowDimensions';
function Login({controlNotification}) {
  const { width } = useWindowDimensions();
  const [getDetails,setDetails] = useState({email:'',password:''})
    const navigator = useNavigate()
    const signup = () =>{
 
      if(getDetails.email !== '' , getDetails.password !== ''){  
      fetch('/api/user/login',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({email:getDetails.email,password:getDetails.password})
      })
      .then(res => res.json())
      .then((data) => {
        
        if(data.status == 'success' || data.roll == 'student'){ 
          navigator(`/?=${data.id}`)
      }
      if(data.status == 'success' || data.roll == 'teacher'){ 
        navigator(`/admin/dashboard?=${data.id}`)
    }
        if(data.status == 'error') controlNotification(data.status,data.message)
      })
    
    }
    else controlNotification('info','Please enter email and password')
       
    }
    useEffect(()=>{
      fetch('/isLogin')
      .then(res => res.json())
      .then((data) =>{ 
        if(data.status == 'isLogin') navigator(`/?=${data.id}`)
    })
    },[])
  return (
        <Paper
                sx={{
                  borderRadius: "7px",
                  background: "#FFF",
                  boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.15)",
                  width: "423px",
                  height: "443px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  ...(width < 1000 && {
                    width: "80%",
                    height: "443px",
                 
                  })
                }}
              >
                <Stack
                  direction="column"
                  width="80%"
                  spacing="25px"
                  height="75%"
                >
                  <Stack direction="column" spacing="10px">
                    <h1>Login</h1>
                 
                  </Stack>
                  <Stack direction="column" spacing="10px">
                    <label htmlFor="">Email</label>
                    <TextField
                      id="outlined-basic"
                      label="Enter your Email"
                      variant="outlined"
                      onChange={(e)=> setDetails((preValue)=> {
                        const getValue = {...preValue}
                        getValue.email= e.target.value
                        return getValue
                      })}
                    />
                  </Stack>
                  <Stack direction="column" spacing="10px">
                    <label htmlFor=""> password</label>
                    <TextField
                      id="outlined-basic"
                      label="password"
                      variant="outlined"
                      onChange={(e)=> setDetails((preValue)=> {
                        const getValue = {...preValue}
                        getValue.password= e.target.value
                        return getValue
                      })}
                    />
                  </Stack>
                  <Button
                    style={{
                      borderRadius: "4px",
                      width: "100%",
                      color: "white",
                      background: "#187163",
                    }}
                    onClick={signup}
                  >
                    Login
                  </Button>
                </Stack>
              </Paper>
  
  )
}

export default Login
