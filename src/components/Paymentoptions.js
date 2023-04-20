import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import "../components/Paymentoptions.css";
import { Link } from 'react-router-dom'
function Paymentoptions() {
    const value=useSelector((state)=>state.display.data1)
    console.log(value,"iam payment options")
    const info=useSelector((state1)=>state1.display.DeliveryAddress)
    console.log(info,"iam 9th address details")
  return (
    <div>
      <div className="Paymentoptionimage">

        <div style={{alignItems:"center", color:"black"}}>
            <label>Price is:</label><h6>{value.price}</h6>
            <h6> Delivery Address is</h6>
            <h6>{info.Mandal}</h6>
            <h6>{info.State}</h6>
            <button className="btn btn-primary"><Link to='/Success'   className="SignIn" >Pay now</Link></button>
        </div>
      </div>
     
    </div>
  )
}

export default Paymentoptions
