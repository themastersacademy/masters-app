import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function  ResultSolution () {
    const {search} = useLocation()
    const examID = search.split('=')[1]

    useEffect(() =>{
        console.log(examID)
        fetch(`/api/exam/solution/${examID}`)
        .then(res =>  res.json())
        .then(data => console.log(data)) 
    },[])
  return (
    <div>
      
    </div>
  )
}


const Solution = () =>{
    return(<>
    </>)
}