import React, { useState } from 'react'
import '../components/AdminHome1.css'
import { Link, useLocation } from 'react-router-dom';
function AdminHome() {
  const Location=useLocation();
let data=Location.state;
console.log(data)
  return (
    
    <div className='Adminnavbar'>
      <div class="d-flex flex-column justify-content-center w-100 h-100">

<div class="d-flex flex-column justify-content-center align-items-center">
    <h1 class="fw-light text-white m-0"> 
    <h3>  <span>Welcome To</span>
            <span style={{ color: 'red' }}> Quick</span>
            <span style={{ color: 'aqua' }} >Port</span>
            <span style={{ color: 'red' }}>365</span>
        </h3></h1>
    
    <a href="https://manuel.pinto.dev" class="text-decoration-none">
        <h5 class="fw-light text-white m-0">Quick Port 365 Admin Details —</h5>
    </a>
</div>
</div>
</div>
 
  )
}

export default AdminHome

