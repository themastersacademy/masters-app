import React, { useState } from 'react'
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import useWindowDimensions from '../../../util/useWindowDimensions';
function FirstPage({controlNotification}) {
  const { width } = useWindowDimensions();
  const [getDetails,setDetails] = useState({email:'',password:''})
    const navigator = useNavigate()
    const signup = () =>{
      if(getDetails.email !== '' && getDetails.password !== ''){ 
      if (validator.isEmail(getDetails.email)) {
     
      fetch('/api/user/create',{
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify({email:getDetails.email,password:getDetails.password})
      })
      .then(res => res.json())
      .then((data) => {
        controlNotification(data.status,data.message)
        if(data.status == 'success') navigator('/login/verify')
      })

    }     
else {
    controlNotification('info','Enter valid Email!')
  }
  }
  else controlNotification('info','Please fill the details')
    }
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
                  spacing="15px"
                  height="75%"
                >
                  <Stack direction="column" spacing="10px">
                    <h1>Sign Up</h1>
                    <p>Already have an account <span style={{color:'#0038FF',cursor:'pointer',width:'55px'}} onClick={()=> navigator('/login')} >Log in </span> </p>
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
                    <label htmlFor="">Create password</label>
                    <TextField
                      id="outlined-basic"
                      label="Enter your password"
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
                    Sign up
                  </Button>
                </Stack>
              </Paper>
  
  )
}

export default FirstPage
