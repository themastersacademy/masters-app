import React, { useEffect, useState } from 'react'
import InstitutionDetails from '../../../component/admin/institution/InstitutionDetails'
import InstitutionControl from '../../../component/admin/institution/institutionControl'
function Institution({ControlNotification}) {
  const [institute,setInstitute]= useState([])
  const [isChange,setChange] = useState(false)
  const changeRoll =(data) => {
    fetch('/api/admin/changeRoll',{
      method:'POST',
      headers:{
        "Content-type":"application/json"
      },
      body:JSON.stringify({list:data})
    })
    .then(res => res.json())
    .then(data => {
      if(data.status == 'success'){
         callInstitutionList()
        setChange(!isChange)
      }
      ControlNotification(data.status,data.message)
    })
  }

const callInstitutionList = () =>{
  fetch('/api/admin/getInstitution')
  .then(res => res.json())
  .then(data => {
    if(data.status == 'success') setInstitute(data.message)
    })
}

useEffect(()=>{
  callInstitutionList()
},[])

  return (
    <div>
       <InstitutionControl changeRoll={changeRoll} isChange={isChange} />
       <div style={{marginTop:'20px'}}>
       {institute.length >0 ?  institute.map((task,index) => <InstitutionDetails task={task} key={index} ControlNotification={ControlNotification} /> )  : null }
       </div>
     
    </div>
  )
}

export default Institution
