import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../components/Compliants.css'
function Compliants() {
  const [ApiDetails1, setApiDetails] = useState([])


  useEffect(() => {
    axios.get("http://192.168.2.236:8000/api/complaints/")
      .then(res => {
        console.log(res.data)
        setApiDetails(res.data)
      })
  }, [])
  return (
    
   
<div className='item-container1'>
                {
                ApiDetails1.map((e) => (
                          <div className='card' id="compcard" key={e.id}>
                        <p className='card-1'><b>booking_id :</b>{e.booking_id}</p>
                        <p className='card-2'><b>issue:</b>{e.issue}</p>
                        <p className='card-3'><b>updated:</b>{e.updated}</p>
                        <p className='card-4'><b>user:</b>Ganesh</p>
                    
                    </div>
                ))}
            </div>

  )
}

export default Compliants
