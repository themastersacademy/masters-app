

exports.currentTime =()=>{
    try {

        const d = new Date();
        const localTime = d.getTime();
        
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = +5.5 // UTC of Indian Time Zone is +5.5
        const india = utc + (3600000 * offset );
        
        const indianTimeNow = new Date(india).toLocaleString();
      
   return new Date(indianTimeNow)
    } catch (error) {
        throw error
    }
}

exports.examStartTime = (date,time)=>{
    try {

        const getDate = date.split('/') 
        const getTime = time.split(':')

        const d = new Date();
        d.setMonth(getDate[1]-1)
        d.setFullYear(getDate[2])
        d.setDate(getDate[0])
        d.setHours(getTime[0])
        d.setMinutes(getTime[1])
        const localTime = d.getTime();
        
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = +5.5 // UTC of Indian Time Zone is +5.5
        const india = utc + (3600000 * offset);
        
        const indianTimeNow = new Date(india).toLocaleString();
      
   return new Date(indianTimeNow)

      } catch (error) {
        throw error;
      }
}


exports.examEndTime = (date,time)=>{
    try {

        const getDate = date.split('/') 
        const getTime = time.split(':')

        const d = new Date();
        d.setMonth(getDate[1])
        d.setFullYear(getDate[2])
        d.setDate(getDate[0]-1)

        const localTime = d.getTime();
        
        const localOffset = d.getTimezoneOffset() * 60000;
        const utc = localTime + localOffset;
        const offset = +5.5 // UTC of Indian Time Zone is +5.5
        const india = utc + (3600000 * offset + (eval(getTime[0]*3600000) + (eval(getTime[1]*60000))));
        
        const indianTimeNow = new Date(india).toLocaleString();
      
   return new Date(indianTimeNow)

      } catch (error) {
        throw error;
      }
}

