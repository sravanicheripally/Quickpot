import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import '../components/Quickport.css'

function Picked() {
    const[ApiDetails,setApiDetails]=useState([])
 
    useEffect(()=>{
      axios.get("http://192.168.2.236:8000/api/total_orders_picked/")
      .then(res=>{
          console.log(res.data)
      setApiDetails(res.data)})
      },[])    
    return (
      
        <div class="area" >
              <ul class="circles">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
              </ul>   
           <h4 className='BookingDetails'>
                      Picked Details</h4>               
                    
                   <table class="table table-hover" id="Bookingtable">
          <thead>
            <tr>
            <th class="table-primary">BookingId</th>
              <th class="table-warning">UserName</th>
              <th class="table-success">Date</th>
              <th class="table-secondary">ItemName</th>
              <th class="table-warning">status</th>
              <th class="table-primary">PorterName</th>       
          </tr>
          </thead>
          <tbody>{
            ApiDetails.map((e, i) => (
              <tr>
                <td>{e.id}</td>
                <td>{e.user}</td>
                <td>{e.date}</td>
                <td>{e.item_name}</td>
                <td>{e.status}</td>
             <td>{e.driver}</td>
            </tr> 
            ))}
          </tbody>
        </table>
                  
                
              </div>
   
           
  
      
    )
  }

export default Picked
