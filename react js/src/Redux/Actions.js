import { createSlice } from "@reduxjs/toolkit";
import DeliveryPincode from "../components/DeliveryPincode";

export const displayData = createSlice({
    name:"srujana",
    initialState:{
        data:[],//parcel
        data1:[],//premium,standard
        DeliveryAddress:[],//deliveryaddress
        DeliveryPincode:[],//origin,destination
      
        DeliveryData:[],//pickup
        Deliveryusername:[],//username
        Deliveryrole:[]
    },
    reducers:{
send:(state,action)=>{
    state.data=action.payload
},
sendingStandard:(state,action)=>{
 state.data1=action.payload
},
sendDeliveryAddress:(state,action)=>{
state.DeliveryAddress=action.payload
},
sendDeliveryPincode :(state,action)=>{
    state.DeliveryPincode= action.payload
},

sendDeliveryData :(state,action)=>{
state.DeliveryData= action.payload
},
sendusername :(state,action)=>{
    state.Deliveryusername=action.payload
},
sendDeliveryrole :(state,action)=>{
state.Deliveryrole= action.payload
}
    }
})
export const{send,sendingStandard,sendDeliveryAddress,sendDeliveryPincode,sendDeliveryParcel,sendDeliveryData,sendusername,sendDeliveryrole}=displayData.actions
export default displayData.reducer