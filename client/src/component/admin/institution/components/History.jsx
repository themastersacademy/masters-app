import React from 'react'
import { Paper } from '@mui/material'
export default function History ({batch})  {
  return (
    <div style={{marginTop:'20px'}}>
        {batch.scheduleTest.length > 0 ? batch.scheduleTest.map((task,index) => <Card key={index} task={task} /> )   : null}
    
    </div>
  )
}


const Card = ({task}) =>{

    return(
<Paper 
sx={{width:'100%',height:'60px',
borderRadius: '5px',
background:' #FFF',
boxShadow: '0px 15px 62px 0px rgba(0, 0, 0, 0.08)',
display:'flex',
alignItems:'center',
padding:'20px',
justifyContent:'space-between'
}}
>
<p> name: {task.name}</p>
<p> status: {task.status}</p>
</Paper>
    )
}
