import axios from 'axios'
import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import '../components/Bookings.css'
function Bookings() {
  const[ApiDetails,setApiDetails]=useState([])
  const [arrnew, setArrnew] = useState([])
 
  useEffect(()=>{
    axios.get("http://192.168.2.236:8000/api/total_orders/")
    .then(res=>{
        console.log(res.data)
    setApiDetails(res.data)})
    },[])
    const clickedView = (e) => {
      e.preventDefault()
            var data = {
            Destination_country:e.Destination_country,
            created:e.created,
            date:e.date,
            delivery_address:e.delivery_address,
            Bookingid: e.Bookingid,
            YourOrders: e.YourOrders,
            Date: e.Date,
            Itemname: e.Itemname,
            status: e.status,
            driver:e.driver,
            driver_phone:e.driver_phone,
            id:e.id,
            image:e.image,
            item_name:e.item_name,
            item_weight:e.item_weight,
            origin:e.origin,
            picked:e.picked,
            pickup_address:e.pickup_address,
            receiver_name:e.receiver_name,
            receiver_phone:e.receiver_phone,
            services:e.services,
            status:e.status,
            updated:e.updated,
            user:e.user

          }
          arrnew.push(data)
          console.log(arrnew);
     
   }
 
    
  return (
    <div className='Bookingsadmin'>
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
  
         <div class="context">
            <div className='card border-0 shadow rounded-3 my-5 mb-5'  id="Bookingcard">
            <div className='card-body'>
                <h4 className='BookingDetails'>
                    Booking Details
                </h4>    
                 <table class="table table-hover" id="Bookingtable">
        <thead>
          <tr>
            <th class="table-primary">Bookingid</th>
            <th class="table-success">Date</th>
            <th class="table-secondary">Itemname</th>
            <th class="table-warning">status</th>
            <th class="table-primary">viewDetails</th>
                  </tr>
        </thead>
        <tbody>{
          ApiDetails.map((e, i) => (
            <tr>
              <td>{e.id}</td>
              <td>{e.date}</td>
              <td>{e.item_name}</td>
              <td>{e.status}</td>
              <td>
                {/* <Link to='/BookingsView' state={arrnew} > */}
                
             <button type="button" class="btn btn-light bookings"id='bookingsbutton' onClick={()=>clickedView(e)}>
             
                 viewDetails
                </button>
                {/* </Link> */}
               
              
                </td>        
             
            </tr> 
          ))}
        </tbody>
      </table>
                
              
            </div>
           </div>
         
    </div>

    </div >

    </div>
  )
}

export default Bookings
