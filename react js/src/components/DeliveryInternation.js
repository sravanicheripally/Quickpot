import React, { useState } from 'react'
import '../components/DeliveryPincode.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import loc from '../components/Images/loc.jpg'
import axios from 'axios';

function DeliveryInternation() {
 
    return (
    <div>
    
        <div className='Welcome'>
        <div>
          <h3>Welcome John</h3>
        </div>

      </div>
      <div className='card border-0 shadow rounded-3 my-0 mb-0'  >
            <div className='card-body'>       
      <div className='image' >
        <img src={loc} height="682px" width="100%" />
        <div class="Location"  ><b>Choose Your Delivery Range</b><br />
          <button className='btn btn-primary'>Domestic</button>
          <span style={{ padding: '5px' }}></span><button className='btn btn-primary'>International</button>
          <div style={{ padding: '15px' }}>
            <div class="col">
              <div class="col">
                <input type="number" 
                placeholder='Orginal Pincode' 
               
                />
                </div>
                <br />
              <div class="col">
                <input type="number"
                 placeholder='Destination Pincode'

                 
                  />
                  </div>
              <div className='button' style={{ padding: '10px' }}><button type="button" class="btn btn-primary">Submit</button></div>
            </div>
          </div>
        </div>
      </div>
      </div></div>
    </div>

  )
}

export default DeliveryInternation
