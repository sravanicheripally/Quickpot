
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../components/Quickport.css'
function Quickport() {
  const [ApiDetails, setApiDetails] = useState([])
  const pending = () => {
    axios.get("http://192.168.2.236:8000/api/total_orders_pending/").then(res => { console.log(res.data); setApiDetails(res.data) })
  }
  const picked = () => {
    axios.get("http://192.168.2.236:8000/api/total_orders_picked/").then(res => { console.log(res.data); setApiDetails(res.data) })
  }
  const process = () => {
    axios.get("http://192.168.2.236:8000/api/total_orders_process/").then(res => { console.log(res.data); setApiDetails(res.data) })
  }
  const completed = () => {
    axios.get("http://192.168.2.236:8000/api/total_orders_delivered/").then(res => { console.log(res.data); setApiDetails(res.data) })
  }
  useEffect(() => {
    axios.get("http://192.168.2.236:8000/api/total_orders/")
      .then(res => {
        console.log(res.data)
        setApiDetails(res.data)
      })
  }, [])
  const handlesubmit = () => {

  }
  return (

    <div className='area1' >
      {/* <button type="button" class="btnquick">   <Link to="/Total"> Total</Link> </button>
      <button type="button" class="btnquick">  <Link to="/Pending">  Pending</Link></button>
      <button type="button" class="btnquick">   <Link to="/Picked"> Picked</Link></button>
      <button type="button" class="btnquick">  <Link to="/In_process">  In_process</Link></button>
      <button type="button" class="btnquick">  <Link to="/Delivered">  Delivered</Link></button> */}
      {/* <div style="display: flex; flex-direction: row; justify-content: space-between;">
      
        
        </div> */}
        <div className="ButtonContainer">
        <button type="button" onClick={pending}>Pending</button>
        <button onClick={picked}>Picked</button>
        <button onClick={process}>Process</button>
        <button onClick={completed}>Completed</button>
  </div>
        <table class="BookingDetails1" id="Bookingtable">

          <thead>
            <tr>
              <th >Bookingid</th>
              <th >username</th>
              <th >Date</th>
              <th >Itemname</th>
              <th >status</th>
              <th>Portername</th>
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
        <span class="btnquick"></span>
        <span class="btnquick"></span>

      </div>



      )
}

      export default Quickport
