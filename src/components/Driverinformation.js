import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
function Driverinformation() {
    const[name,setname]= useState("")
    const[email,setemail]= useState("")
    const[phone,setphone]= useState("")
    const[error,setError] = useState(false)
    const[data,setData] = useState(false)
    let val = {
        name: name,
        email: email,
        phone:phone,
      };
    const handleclick = (e)=>{
        e.preventDefault()
        
          axios
      .post(
        "http://192.168.2.236:8000/api/driver_entry",
        val).then(re=>{
            console.log(re, "postfdgfdg");
        })
setData(true)
if(name.length== 0    ){
setError(true)

}else{
    setError(false)
}
if(phone.length==0){
    setError(true)
}else{
    setError(false)
}

if(email.length == 0 ){
    setError(true)

}
else{
    setError(false)
}
    }

    
  return (
    <div>
      <form >
           <div className="row py-3 mb-4">   
           <div className="col-lg-5">  
              <div className="mb-3">  
              <label className="form-label">User Name</label>    
              <input
                    type="/^[A-Za-z\s]*$/"
                    className="form-control"
                    placeholder="User Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)} />
                      {error && name == 0 ?  <p>name cant be empty</p>: null}
                    </div>
                    </div>
                    <div className="row py-3 mb-4">   
           <div className="col-lg-5">  
              <div className="mb-3">  
              <label className="form-label">Email</label>    
              <input
                    type="Email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)} />
                      {error && email == 0 ?  <p>Email cant be empty</p>: null}
                    </div>
                    </div>
                    </div>
              
               
           <div className="col-lg-5">  
              <div className="mb--5">  
              <label className="form-label">Phonenumber</label>    
              <input
                    type="Number"
                    className="form-control"
                    placeholder="Phonenumber"
                    value={phone}
                    onChange={(e) => setphone(e.target.value)} />
                     {error && phone == 0 ?  <p>phonenumber cant be empty</p>: null}
                    </div>
                    </div>
                    <div className="row py-3 mt-3 mb-5">     
         <div className="col-lg-6 ">    
            <div className="d-grid gap-2 col-6 mx-auto">      
            <button type="button" className="btn btn-primary" onClick={handleclick}>   
                 Submit
                  </button> 
                  </div>
                  </div></div>
                   
                    </div>
                    </form>
    </div>
  )
}

export default Driverinformation
