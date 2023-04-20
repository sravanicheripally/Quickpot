import React from 'react'
import axios from 'axios';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import "../components/Driverpickedorderdetails.css";
import { useState } from 'react';
function Driverpickedorderdetails(props) {
    const {state} = useLocation();
  console.log(state)
  const [status,setstatus] = useState('')
  const changestatus = (e) =>{
    setstatus(e.target.value)
  }
  const handlesubmit=(e)=>{
    const Total = {
      "status": status
     };  
     console.log(Total,'0000000000000')
      axios.patch("http://192.168.2.236:8000/api/total_orders/"+state.id+"/",Total )
    .then(res=>{
      console.log(res,"srujana")
      //   setapi(res.data)

      })
  }

  return (
    <div>
  
  <div className="Driverimage">
      <h2 style={{textAlign: "center"}}>select yes to confirm</h2>
<div class="container"> 
   <div class="row">  
      <div class="col-xs-6 col-xs-offset-6"> 
           <div class="dropdown">      
      Status:<select onChange={changestatus}>&nbsp;&nbsp;

<option defaultValue='select'>select</option>  
<option defaultValue="No">in_process</option>
<option defaultValue="Yes">started</option>
<option defaultValue="Yes">completed</option>
   </select>   
     </div>   
 </div>
</div>
</div>
<div class="container"> 
 <div class="center">   
 {/* <button onClick = {()=>{handlesubmit ()}}>submit</button>  */}
 <Link to='/DriverPickedOrder'>
  <button onClick={handlesubmit}>Submit</button>&nbsp;&nbsp;
  </Link>
 </div>
 
</div> 
</div>

    </div>
  )
}

export default Driverpickedorderdetails
