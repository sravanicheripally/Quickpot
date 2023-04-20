import React from "react";
import { useSelector } from "react-redux";
// import { useSelector } from 'react-redux'
// import { useLocation } from "react-router";
import { Link } from 'react-router-dom'
import "../components/PaymentDetails.css";
function PaymentDetails() {
  const { data } = useSelector((state) => state.display);
  console.log(data, "hello");
  return (
    <div    className="Paymentimage"> 
        <div class="row justify-content-evenly mt-5">
    
        <div class="col-md-3 mb-4 ">
          <div class="card">
       
 
           <div class="card-header">  <span style={{ color: 'red' }}> Order Summary</span>  
  
   <div className="card-body">  {
            // data.map((e)=>Object.keys(e).map(el=>el))
            data.map((e) => (
              <div>                {" "}
                <div> Item-weight :<span style={{ color: 'red' }}>{e.ItemWeight}</span></div>{" "}
                <div> Item-name:<span style={{ color: 'red' }}>{e.ItemName}</span></div>{" "}
                <div> PickUpDate:<span style={{ color: 'red' }}>{e.PickUpDate}</span></div>{" "}
                <div> ChooseParcelImage:<span style={{ color: 'red' }}>{e.ChooseParcelImage}</span></div>{" "}
                <div> ReciversName:<span style={{ color: 'red' }}>{e.ReciversName}</span></div>{" "}
                <div> ReciverPhonenumber:<span style={{ color: 'red' }}>{e.ReciverPhonenumber}</span></div>{" "}
              </div> 
                         ))
          }
<br></br>
<div class="container">  
   <button className="btn btn-success"><Link to='/Services'  className="SignIn"  > Go to Payment</Link>  </button>  <br></br> <br></br>
      {}
  <button  className="btn btn-danger"><Link to='/Parcel'   className="SignIn" >Cancel</Link>  </button>
  </div>
     </div>  
     </div>
     </div>    
     </div> 
     </div>
    //  </div>

      );
}
export default PaymentDetails;
