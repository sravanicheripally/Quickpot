import React from 'react'
import { useSelector } from "react-redux";
import '../components/Profile.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation } from 'react-router-dom';
import loc from '../components/Images/loc.jpg';
// import loc from '../components/Images/loc.jpg'
function Profile() {
// const Location=useLocation();
const{ data }  = useSelector((state) => state.display.Deliveryrole);
console.log(data, "hello");
// console.log(data)
  return (
    <div>
    <div>
      
    </div>
    {/* <br/><br/> */}
    <div className='Welcome'>
        <div>
        <h3>{data}</h3>
        </div>
        
    </div>
     <div className='profile-img'> 
    {/* style={{backgroundImage: 'url('+loc+')'}}>  */}
        <img src={loc} height="682px" width="100%" />
        <div class="Location"  ><b>Choose Your Delivery Range</b><br/>
        <button className='btn btn-primary'><Link to='/DeliveryPincode' className='domestic'>Domestic</Link></button>
       <span style={{padding:'5px'}}></span><button className='btn btn-primary'><Link to='/DeliveryInternation' className='International'>International</Link></button>
       <div  style={{padding:'15px'}}></div>
    </div>
    </div>
    </div>
  )
}

export default Profile
// import React from 'react'

// function Profile() {
//   return (
//     <div>
//       helllo
//     </div>
//   )
// }

// export default Profile
