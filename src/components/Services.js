import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
// import img5 from "../components/Images/img5.jpg";
import "../components/Services.css";
import { sendingStandard } from "../Redux/Actions";
// import { sendingPremium } from "../Redux/Actions";
function Services() {
  const [premium, setPremium] = useState([]);
  const [standrd, setstandard] = useState([]);
  const [showData, setShowData] = useState(0);
  const [showpriceData, setPriceData] = useState([]);
const dispath= useDispatch()
  useEffect(() => {
    axios.get("http://192.168.2.236:8000/api/services?service=premium").then((resp) => {
      setPremium(resp.data);
    });
    axios
      .get("http://192.168.2.236:8000/api/services?service=standard")
      .then((resp) => {
        // console.log(resp.data,"hellodata")
        setstandard(resp.data);
       


      });
  }, []);

  const getPremium = (hello) => {
    setShowData(1);

    setPriceData(premium.data);
    console.log(premium.data,"premium data");
    dispath(sendingStandard(premium.data))

  };
  const getStandard = () => {
    setShowData(0);
    setPriceData(standrd.data);
    setShowData(1);

    dispath(sendingStandard(standrd.data))
    setPriceData(standrd.data);
console.log(standrd.data,"standarddata")
    // Navigate('/Paymentoptions')
  };

  const getproceed = () => {};
  return (
    <>
      <div className="serviceimage">
     
    

      <div class="row justify-content-evenly mt-5">
        <div class="col-md-3 mb-4 ">
          <div class="card">
          <h5 class="card-title"> <span style={{ color: "red" }}>payment Details</span></h5>
            <div class="card-body">
            {/* <span style={{ color: "red" }}>payment Details</span> */}
              <button  class="btn btn-primary" onClick={() => getPremium("hello")}>premium</button> &nbsp;
              <button  class="btn btn-primary" onClick={() => getStandard()}>standard </button>
              {showData == 1 ? (
                <div className="card-body">
                  <h6>Total price is: {showpriceData.price}</h6>
                  <h6>Delivery in: {showpriceData.days}</h6>
                </div>
              ) : null}
              
              </div>
            </div>
          </div>
        </div>
        <div class="container">  
        <button   class="btn btn-success" onClick={getproceed}>
                {" "}
                <Link to="/Setaddress" className="SignIn">
                  {" "}
                  proceed
                </Link>
              </button>
              </div>
      </div>
    </>
  );
}

export default Services;

// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// function Services() {
//     const[val,setVal]=useState([])
//     const [show,setShow]=useState(false)
//     useEffect(()=>{
// axios.get("http://192.168.2.236:8000/api/services").then(resp=>setVal(resp.data))
//     },[])
//     console.log(val)
//     const getDetails=()=>{
//      setShow(true)

//     }
//     const Secondone=()=>{
//         setShow(true)
//     }
//   return (
//     <div>
//       <h1>hhhhhhh</h1>
//       <button onClick={getDetails}>Getdetails</button>
//            <button onClick={Secondone}>Secondone</button>

//                   {show?<div>       price: {val.price}
//       </div>:null}
//     </div>  )
// }
// export default Services
