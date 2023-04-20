import React from 'react'
import axios from 'axios';
import { useState } from 'react'
function DriverSignup() {
    const[name,setname]= useState("")
    const[govt_id,setgovt_id]= useState("")
    const[address,setaddress]= useState("")
    const[new_password,setnew_password]= useState("")
    const[re_enter_password,setre_enter_password]= useState("")
    const[error,setError] = useState(false)
    const[data,setData] = useState(false)
    let val = {
        name: name,
        govt_id:govt_id,
        address:address,
        new_password:new_password,
        re_enter_password:re_enter_password,
      };
    const handleclick = (e)=>{
        e.preventDefault()
        
          axios
      .post(
        "http://192.168.2.236:8000/api/driver_signup",
        val).then(re=>{
            console.log(re, "postfdgfdg");
        })
setData(true)
if(name.length== 0    ){
setError(true)

}else{
    setError(false)
}
if( govt_id.length==0){
    setError(true)
}else{
    setError(false)
}

if(  address.length == 0 ){
    setError(true)

}
else{
    setError(false)
}
if(new_password.length == 0 ){
    setError(true)

}
else{
    setError(false)
}
if( re_enter_password.length == 0 ){
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
                    placeholder="name"
                    value={name}
                    onChange={(e) => setname(e.target.value)} />
                      {error && name == 0 ?  <p>name cant be empty</p>: null}
                    </div>
                    </div>
                    <div className="row py-3 mb-4">   
           <div className="col-lg-5">  
              <div className="mb-3">  
              <label className="form-label">   govt_id</label>    
              <input
                    type="Email"
                    className="form-control"
                    placeholder="   govt_id"
                    value={   govt_id}
                    onChange={(e) => setgovt_id(e.target.value)} />
                      {error && govt_id == 0 ?  <p>govt_id cant be empty</p>: null}
                    </div>
                    </div>
                    </div>
                    <div className="row py-3 mb-4">  
              <div className="col-lg-5">  
              <div className="mb--5">  
              <label className="form-label">address</label>    
              <input
                    type="Number"
                    className="form-control"
                    placeholder="address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)} />
                     {error && address == 0 ?  <p>address cant be empty</p>: null}
                    </div>
                    </div>
                    </div>
                    <div className="row py-3 mb-4">   
           <div className="col-lg-5">  
              <div className="mb-3">  
              <label className="form-label">   new_password</label>    
              <input
                    type="Email"
                    className="form-control"
                    placeholder="    new_password"
                    value={    new_password}
                    onChange={(e) => setnew_password(e.target.value)} />
                      {error &&   new_password == 0 ?  <p>  new_password cant be empty</p>: null}
                    </div>
                    </div>
                    </div>
                    <div className="row py-3 mb-4">   
           <div className="col-lg-5">  
              <div className="mb-3">  
              <label className="form-label">   re_enter_password</label>    
              <input
                    type="Email"
                    className="form-control"
                    placeholder="   re_enter_password"
                    value={  re_enter_password}
                    onChange={(e) => setre_enter_password(e.target.value)} />
                      {error &&  re_enter_password== 0 ?  <p> re_enter_password cant be empty</p>: null}
                    </div>
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

export default DriverSignup
