import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
function Totalorders() {
    const[api,setapi]= useState([]);
    const Total = {
       "picked": "true"
      };
    
    useEffect(()=>{
        axios.patch("http://192.168.2.236:8000/api/total_orders/",Total )
      .then(res=>{
        console.log(res,"srujana")
        //   setapi(res.data)
        })
      },[])
  return (
    <div>
   <Table >   
         <thead> 
                   <tr > 
                    <th>id</th>
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
          api.map((e,index) => (
                <tr key={index}>  
                <td>{e.id}</td>
                 <td>{e.receiver_name}</td> 
                 <td>{e.origin}</td> 
                 <td>{e.destination}</td> 
                 {/* <td>{e.Destination_country}</td>  */}
                 <td>{e.item_weight}</td> 
                 <td>{e.item_name}</td> 
                 <td>{e.services}</td> 
                 <td>{e.date}</td> 
                 <td>{e.price}</td> 
                 <td>{e.status}</td> 
                  <td>{e.picked}</td>
                  </tr>             
                                     ))}
    </tbody>
    </Table>
    </div>
  )
}

export default Totalorders
