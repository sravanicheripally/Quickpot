import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { sendDeliveryAddress, sendDeliveryData } from '../Redux/Actions';
function Setaddress() {
  const[info,setInfo]=useState([]);
  const[showDetails, setShowDetails] = useState(0)
  const [Address, setAddress] = useState("")
  const [Pincode, setpincode] = useState("")
  const[city,setcity]=useState("")
  const[District,setDistrict]=useState("")
  const[state,setState]=useState("")
  const[info1,setInfo1]=useState([]);
  const[data, setdata] = useState([]);
  const[data1, setdata1] = useState([]);
  const[showAdressCount, setShowAdressCount] = useState(0);
  const[val,setVal]= useState([]);
  const dispath=useDispatch()
const handleSubmit = ()=>{
        axios.get("http://192.168.2.236:8000/api/getaddress?pincode="+Pincode)
        .then(resp=>{setdata(resp.data.data,"ewrferterty")})
        setShowAdressCount(1)
        console.log(Pincode, typeof Pincode);
        console.log(data,"wrtrytry");       
}
console.log(data,"wrtrytry"); 
dispath(sendDeliveryData(data))  
const handleSubmit1 = ()=>{
  axios.get("http://192.168.2.236:8000/api/getaddress?pincode="+Pincode)
  .then(resp=>{setdata1(resp.data.data, "refrefregrgregggrtgrrgg")})
  setShowAdressCount(1)
  console.log(Pincode, typeof Pincode);
  console.log(data1,"wrtrytry");

}
console.log(data1,"wrtrytry");
dispath(sendDeliveryAddress(data1))
  return (
<div>
    <div class="row">
      <div class="col">
      <div class="card border-0 shadow rounded-3 my-4 mb-4">
            <div class="card-body p-4 p-sm-5 ">
              <h5 class="card-title text-center mb-5 fw-light fs-4">PickUp Address</h5>
              <form>
                <ul>
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
                    onChange={(e) => setpincode(e.target.value)}
                    required autoComplete="off" />


                </ul>
                <ul> <button class="btn btn-primary btn-sm"
                onClick={handleSubmit}
                >Submit</button>
                </ul>
                
                { showAdressCount == 1 ? 
                <div>
                    <ul>
                  <label className="form-label">Mandal</label>
                  <input
                    type="text"
                    value={data.Mandal}
                    className="form-control"
                    placeholder="city"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    value={data.District}
                    className="form-control"
                    placeholder="District"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={data.State}
                    className="form-control"
                    placeholder="State"
                    required autoComplete="off"
                  />
                </ul>
                </div> :
                <div>
                <ul>
                  <label className="form-label">Mandal</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="District"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    required autoComplete="off"
                  />
                </ul>
                </div>
            }
                {/* <ul><button class="btn btn-primary btn-sm"
                // onClick={handleSubmit}
                >Submit</button></ul>
                 */}

              </form>

            </div>
          </div>
       
      </div>
      <div class="col">
       
          <div class="card border-0 shadow rounded-3 my-4 mb-4">
            <div class="card-body p-4 p-sm-5 ">
              <h5 class="card-title text-center mb-5 fw-light fs-4">Delivery Address</h5>
              <form>
              <ul>
                  <label className="form-label">Pincode</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Pincode"
                    onChange={(e) => setpincode(e.target.value)}
                    required autoComplete="off" />


                </ul>
                <ul> <button class="btn btn-primary btn-sm"
                onClick={handleSubmit1}
                >Submit</button>
                </ul>
              { showAdressCount == 1 ? 
                <div>
                    <ul>
                  <label className="form-label">Mandal</label>
                  <input
                    type="text"
                    value={data1.Mandal}
                    className="form-control"
                    placeholder="city"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    value={data1.District}
                    className="form-control"
                    placeholder="District"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={data1.State}
                    className="form-control"
                    placeholder="State"
                    required autoComplete="off"
                  />
                </ul>
                </div> :
                <div>
                <ul>
                  <label className="form-label">Mandal</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="city"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">District</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="District"
                    required autoComplete="off"
                  />
                </ul>

                <ul>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="State"
                    required autoComplete="off"
                  />
                </ul>
                </div>
            }
                {/* <ul><button class="btn btn-primary btn-sm"
                // onClick={handleSubmit}
                >Submit</button></ul>
                  */}
                

              </form>

            </div>
          </div>
        </div>
      </div>
      <button  className="btn btn-success"><Link to='/Paymentoptions'   className="SignIn" >Submit</Link>  </button>
      </div>


  )
}

export default Setaddress