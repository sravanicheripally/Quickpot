

import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import "../components/Paymentoptions.css";
import { Link } from 'react-router-dom'
import Address from './Address';
import axios from 'axios';
import "../components/Sucess.css";
function Success() {
    const user = localStorage.getItem('user')

    const value=useSelector((state)=>state.display.data1)//premium,standard
    console.log(value,"iam payment options")
    const info=useSelector((state1)=>state1.display.DeliveryAddress)//delivery address
    console.log(info.state,"iam 9th address details")
const sign = useSelector((state)=>state.display.data)//parcel
console.log(sign,"i am srujana parcel")
const pink = useSelector((state1)=>state1.display.DeliveryPincode)//origin,destination
console.log(pink,"i am tidhiksha")
const ink = useSelector((state1)=>state1.display.DeliveryData)//pickup
console.log(ink,"i am ram")
let obj = {
   
    "user":user,
    "origin":pink[0].OriginalPincode,
    "destination":pink[0].DestinationPincode,
    "item_weight":sign[0].ItemWeight,
    "item_name":sign[0].ItemName,
    "services":"premium",
    "date": sign[0].PickUpDate,
    "pickup_address":ink,
    "delivery_address":info,
    "receiver_name":sign[0].ReciversName,
    "receiver_phone":sign[0].ReciverPhonenumber
    
}
const submit = ()=>{
    console.log(obj)
    axios.post("http://192.168.2.236:8000/api/total_orders/", obj).then(re=>{
        console.log(re, "postfdgfdg");
    })

}



  return (

<>
      <div className="sucessimage">
     
                         price: <h6>{value.price}</h6>
                        Delivery address:<h6>{info.Mandal}</h6>
                                     <h6>{info.State}</h6>

 
                      ItemWeight:<h6>{sign[0].ItemWeight}</h6>
                      ItemName: <h6>{sign[0].ItemName}</h6>
                      PickUpDate:<h6>{sign[0].PickUpDate}</h6>
 
                      ReciversName: <h6>{sign[0 ].ReciversName}</h6>

                      ReciverPhonenumber:<h6>{sign[0].ReciverPhonenumber}</h6>
                       Pickup address: <h6>{ink.Mandal}</h6>
                                     <h6>{ink.State}</h6>
   
                           Origin: <h6>{pink[0].OrginalPincode}</h6>
                              Destination: <h6>{pink[0].DestinationPincode}</h6>
                              <button className="btn btn-primary" onClick={()=>{submit()}}>submit</button>&nbsp;&nbsp;
   
   <button className="btn btn-primary"><Link to='/Home'   className="SignIn" >Go to Home</Link></button>
    </div>
    </>
  )
}

export default Success


