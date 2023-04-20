import React, { useState,useEffect } from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
function DriverPickedOrder() {
  const[api,setapi]= useState([])
  const user_id = localStorage.getItem('user_id')
  useEffect(()=>{
    axios.get("http://192.168.2.236:8000/api/driver_picked_orders/"+user_id)
  .then(res=>{
    console.log(res.data)
      setapi(res.data)
    })
  },[])
  const navigate = useNavigate();
  const viewClicked = (e)=>{
    navigate("/Driverpickedorderdetails",{ state: e });
  }
   return (
    <div>
 
 <Table >   
         <thead> 
                   <tr > 
          <th>Customer Name </th> 
          <th data-th="Driver details"><span>Origin</span></th>  
           <th>Destination</th>   
         {/* <th>Destination_country</th>  */}
          <th>Item_weight</th> 
         <th>Item_name </th>   
         <th>Services</th>  
         <th>Date</th>  
        <th>Price</th>          
          <th>Status</th>
         <th>picked</th>
           </tr>  
             </thead>   
              <tbody>       
                 {
          api.map((item,index) => (
                <tr key={index}>  
                
                 <td>{item.receiver_name}</td> 
                 <td>{item.origin}</td> 
                 <td>{item.destination}</td> 
                 {/* <td>{e.Destination_country}</td>  */}
                 <td>{item.item_weight}</td> 
                 <td>{item.item_name}</td> 
                 <td>{item.services}</td> 
                 <td>{item.date}</td> 
                 <td>{item.price}</td> 
                 <td>{item.status}</td> 
                  <td>{item.picked}</td>
                  <td> <button className='btn btn-primary'
            onClick={()=>viewClicked(item)}
          >                Update Status


          </button></td>     
          <button type="button" class="btn btn-primary"><Link to='/Home'    >Go to Home</Link></button> 
                                     </tr>             
                                     ))}
    </tbody>
    </Table>
    </div>
  )
}

export default DriverPickedOrder

