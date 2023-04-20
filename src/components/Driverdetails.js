import React, { useState } from 'react'
import axios from 'axios';
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';





function Driverdetails(props) {
  const[arr,setarr]= useState("")
  const {state} = useLocation();
  const [picked,setpicked] = useState('')
  console.log(state,"venkat");
  const getyesno =(e)=>{
    console.log("hellooooo");
    console.log(e.target.value, "e value");
    console.log(state, "state obj");
    console.log(state.picked, "picking value");
    // setpicked(e.target.value)
  }
  // const data = {
  //   'picked':picked
  // }
  const user = localStorage.getItem('user')
  const handlesubmit=(e)=>{
    console.log("Hi")
    setpicked(e.target.value)
    const Total = {
      "picked": picked,
      "user":user
     };  
     console.log(Total)
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
      picked:<select onChange={(e)=>{handlesubmit(e)}}>&nbsp;&nbsp;

<option defaultValue={picked}>select</option>  
<option value="No" >No</option>
<option value="Yes" >Yes</option>

   </select>   
     </div>   
 </div>
</div>
<div className='row'>
  <Link to='/DriverOrder'>
  <button  type="button" class="btn btn-primary" onClick={handlesubmit}>Submit</button>
  </Link>
</div>
</div>
</div>
</div>


 )
}
export default Driverdetails