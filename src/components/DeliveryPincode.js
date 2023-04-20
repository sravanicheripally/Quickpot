import React, { useState } from 'react'
import '../components/DeliveryPincode.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import loc from '../components/Images/loc.jpg'
import location from '../components/Images/location.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { sendDeliveryPincode } from '../Redux/Actions';
import { useDispatch } from 'react-redux';

function DeliveryPincode() {
  const[OrginalPincode,setOrginalPincode]=useState("")
  const[DestinationPincode,setDestinationPincode]=useState("")
  const[arr1,setarr1]=useState([])
  const dispath = useDispatch()
const clickme=(e)=>{
  e.preventDefault();
  let val = {
    OriginalPincode:OrginalPincode,
    DestinationPincode:DestinationPincode
  }
  // console.log(val);
  setOrginalPincode("")
setDestinationPincode("")
  arr1.push(val)
  console.log(arr1)
  dispath(sendDeliveryPincode(arr1))
  axios.post('http://192.168.2.236:8000/api/pincodes', val,
 
  )
    .then((res) => {
      console.log(res);
      // console.log(res.data);
    });

  
}
  return (
    <div >

      <div className='Welcome'>
        <div>
          <h3></h3>
        </div>

      </div>
      <div className='card border-0 shadow rounded-3 my-0 mb-0'  >
        <div className='card-body'>
          <div className='image' >
            <img src={loc} height="682px" width="100%" />
            <div class="Location"  ><b>Choose Your Delivery Range</b><br />
              <button className='btn btn-primary'>Domestic</button>
              <span style={{ padding: '5px' }}></span>
              <button className='btn btn-primary'>International</button>
              <div style={{ padding: '15px' }}>
                <div class="col">
                  <div class="col"><input type="number" 
                  placeholder='Orginal Pincode' 
                  value={OrginalPincode}
                  onChange={(e)=>setOrginalPincode(e.target.value)}
                  /></div><br />
                  <div class="col"><input type="number" 
                  placeholder='Destination Pincode'
                  value={DestinationPincode}
                 onChange={(e)=>setDestinationPincode(e.target.value)}
                   /></div>
                  <div className='button' style={{ padding: '10px' }}>
                    
                    <button type="button" class="btn btn-primary" onClick={clickme}><Link to="/Parcel" className='Parcel'>Submit</Link></button></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default DeliveryPincode
