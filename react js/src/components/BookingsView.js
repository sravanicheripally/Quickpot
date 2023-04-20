import React from 'react'
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import  { useEffect, useState } from 'react'
function BookingsView() {
  const[ApiDetails,setApiDetails]=useState([])
  const user_id = localStorage.getItem('user_id')
    useEffect(()=>{
      axios.get("http://192.168.2.236:8000/api/user_orders/"+user_id)
      .then(res=>{
          console.log(res.data)
      setApiDetails(res.data)})
      },[])
  return (
    <div>
    <Table striped>
      <thead>
        <tr>
        <th>Booking Id</th>
        <th>Item Name</th>
          <th>Date</th>
          <th>Delivery Address</th>
          <th>Driver Phone</th>
         
         
          <th>Item Weight</th>
          <th>Pincode</th>
          {/* <th>receiver_address</th> */}
          {/* <th>receiver_phone</th> */}
         
          <th>Status</th>
          {/* <th>updated</th> */}
          {/* <th>user</th> */}
 {/* <th>services</th> */}
        </tr>
      </thead>
      <tbody>
        {
                ApiDetails.map((e, i) => (
                        <tr key={i}>
    <td>{e.id}</td>
    <td>{e.item_name}</td>
          <td>{e.date}</td>
          <td>{e.delivery_address}</td>
          <td>{e.driver_phone}</td>
          <td>{e.item_weight}</td>
          <td>{e.origin}</td>
  
        
          <td>{e.Pincode}</td>
          {/* <td colSpan={2}>{e.receiver_address}</td> */}
          {/* <td>{e.receiver_phone}</td> */}
        
          <td>{e.status}</td>
          {/* <td>{e.updated}</td> */}
          {/* <td>{e.user}</td> */}
            {/* <td>{e.services}</td> */}
          </tr>
           ))}
      </tbody>
    </Table>
    </div>
  )
}

export default BookingsView
