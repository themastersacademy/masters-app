


const Home=()=>{

    function call(){
        // fetch('/api/caller',{
        //     method:"POST",
        //     headers:{"Content-type":"application/json"},
        //     body:JSON.stringify({user:"MUTHU"})
        // })

    }

    return(
        <div>
            HOME
 <button onClick={call}>send</button>
        </div>
    )
}

export default Home