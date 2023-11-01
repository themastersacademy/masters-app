import { Stack, } from "@mui/material";
import image from './Avater'
export default function ErrorPage (){
    return(       
<Stack direction='column' justifyContent='center' alignItems='center' gap='10px' >
<img src={image.Error} style={{width:'900px', height:'400'}} alt="" />
<p style={{fontSize:'48px', fontWeight:'700'}}>Page not found</p>
<p style={{fontSize:'16px',fontWeight:'400',color:'var(--cool-gray-500, #6B7280)' }}>Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.</p>
</Stack>
    )
}