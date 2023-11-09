import { Stack,Button } from "@mui/material";
import Header from '../../exam/pages/components/ExamHeader'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../util/Footer";
import useWindowDimensions from "../../../util/useWindowDimensions";
export default function Failure (){
    const navigator =useNavigate()
    const [user,setUser] = useState([])
    const {width} = useWindowDimensions()
    useEffect(()=>{
     
        fetch("/payMent")
        .then((res) => res.json())
        .then((data) => {
            if(data.status == false)  navigator('/')
        })
       
        fetch('/api/user/getUserDetails')
        .then(res => res.json())
        .then(data => setUser(data)) 
    },[])

    const handleFailure = ()=>{
        fetch('/handleStatus')
        .then(res => res.json())
        .then(data => {
           if(data.status == 'success') navigator('/')
        })
       }

    return(
        <Stack direction='column'  alignItems='center' height='100vh' padding='20px' >
            <Stack width={ width < 650 ? '100%' : '80%' }   direction='column' height='100%' alignItems='center'  gap='20px' >
                < Header user={user} />
                 <Stack width='100%' gap='20px' height='820px' borderRadius='11px'  boxShadow='0px 4px 11px 4px rgba(111, 111, 111, 0.15)' justifyContent='center' alignItems='center' >
                 <img style={{width:  width < 650 ? '50%' : '30%' }} src="https://s3-alpha-sig.figma.com/img/b6ba/ed92/7ba1ce21025d2972d44fa190cde99c16?Expires=1699833600&Signature=Gb3EWnvifeptt4TLBj-L3hlrhme19xBn6QYt-61NmnAWGHhGoLT998jckX24QFPiUHjLFtShj8yw6SZ7hEerDWWr8f6NACaUZYCzPP6MIiFjYbByt28gdHS81slP4GmnVyj76IHioYYY~mgB2969N0RRoyDGsh5reee8mWOuzB3OaJRoG32of0akKiKlUte1JMe9FyQOnR2AUQRUrwgLg7eumbmRVYB05iq9wPLFeB6zrc42fSVLIJo25HRIyGXx80naV-VQb8cLfM4eyq2tNHN-DC6qpfmN1DMTLwTp~EMLBmee0skRuIz9Ga9qhsc1hWEIb9tSNdyJaZaLcvZGQg__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4" alt="" />
                 <p style={{fontSize:'20px',color:" #187163", fontWeight:'700'}} >Payment Failure</p>
                 <Button onClick={handleFailure} style={{background:'#187163',color:'white',width:"150px"}}>Done</Button>
                 </Stack>

                 <Stack marginTop='auto' width='100%'>
                 <Footer />
                 </Stack>
            
            </Stack>
        </Stack>
    )
}