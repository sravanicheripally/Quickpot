import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import '../components/Drivers.css'
function DriverOrder() {
    const[api,setApi]= useState([]);

useEffect(()=>{
  axios.get("http://192.168.2.236:8000/api/total_orders_pending/")
.then(res=>{
const result=res.data
  setApi(result)
  })
},[])
const navigate = useNavigate();
const viewClicked = (e)=>{
  navigate("/Driverdetails",{ state: e });
};
console.log(api)

  return (
    <div>  
  <Table > 
        <thead>
                   <tr >   
                 <th>id</th>
          <th>Customer Name </th> 
         <th data-th="Driver details"><span>Origin</span></th>    
       <th>Destination</th>   
    {/* <th>Destination_country</th>     */}
      <th>Item_weight</th>   
      <th>Item_name </th>     
    <th>Services</th>       
  <th>Date</th>      
  <th>Price</th>        
  <th>Status</th>       
  {/* <th>picked</th>         */}
   </tr>           
  </thead>            
  <tbody>                 {
        api.length>0 && api.map((item,index) => (
                <tr key={index}>                
<td>{item.id}</td>   
             
 <td>{item.receiver_name}</td>   
              <td>{item.origin}</td>   
              <td>{item.destination}</td>    
             {/* <td>{item.Destination_country}</td>    */}
              <td>{item.item_weight}</td>         
        <td>{item.item_name}</td>              
   <td>{item.services}</td>                
 <td>{item.date}</td>               
  <td>{item.price}</td>               
  <td>{item.status}</td>         
         {/* <td>{item.picked}</td>      */}
             <td> <button className='btn btn-primary'
            onClick={()=>viewClicked(item)}
          >                Click here to pickup


          </button></td>      
          <button className="btn btn-primary"><Link to='/Home'    >Go to Home</Link></button>                  

  </tr>     ))}

    </tbody>
    </Table>   
 </div> 
 )
}
export default DriverOrder