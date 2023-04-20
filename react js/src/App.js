import './App.css';
import Profile from './components/Profile';
import DeliveryPincode from './components/DeliveryPincode';
import { BrowserRouter as  BrowserRouter, Route, Routes , } from 'react-router-dom';
import DeliveryInternation from './components/DeliveryInternation';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Parcel from './components/Parcel';
import Navbar1 from './components/Bar';
import Bar from './components/Bar';
import Home from './components/Home';
import Login from './components/Login';
import Address from './components/Address';
import Bookings from './components/Bookings';
import BookingsView from './components/BookingsView';
import Login1 from './components/Login1';
import AdminNavbar from './components/AdminNavbar';
import Drivers from './components/Drivers';
import Compliants from './components/Compliants';
import Quickport from './components/Quickport';
import Logout from './components/Logout';
import { ListGroupItem } from 'react-bootstrap';
import Total from './components/Total';
import Pending from './components/Pending';
import Picked from './components/Picked';
import In_Process from './components/In_Process';
import Delivered from './components/Delivered';
import AdminHome from './components/AdminHome';
import DriversAdmin from './components/DriversAdmin';
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react';
import DriverPickedOrder from './components/DriverPickedOrder';
import PaymentDetails from './components/PaymentDetails';
import Services from './components/Services';
import Setaddress from './components/Setaddress';
import Paymentoptions from './components/Paymentoptions';
import Success from './components/Success';
import DriverOrder from './components/DriverOrder';
import Driverdetails from './components/Driverdetails';
import Totalorders from './components/Totalorders';
import Driverpickedorderdetails from './components/Driverpickedorderdetails';
import Driverinformation from './components/Driverinformation';
import Driversucess from './components/DriverSignup';
import { useDispatch,useSelector } from 'react-redux';
import { sendDeliveryrole } from './Redux/Actions';
import Contact from './components/Contact';


function App() {
  const[arr,setArr]=useState()
  const[roleValues,setRoleValues]=useState()

  let roleData=''
  const dispath = useDispatch()
  const value=useSelector((state)=>state.display.Deliveryrole)
  console.log(value)
 useEffect(()=>{
 const a= localStorage.getItem('role')
 setRoleValues(a)
 })
 console.log(roleValues)
  const handleFunction=(e)=>{

roleData=e
// const roleData1= e ? e : roleData
// console.log(roleData1)
setArr(roleData)
console.log(roleData)
setRoleValues(roleData)
dispath(sendDeliveryrole(roleData.data))
  }
 
  console.log(arr)

  return (
    <div className="App">   
    {/* {roleData.role === "is_active" &&( */}

      <BrowserRouter>  
    <Navbar role={arr?.role}/>  
    <Routes>   
   <Route path='/' element={<Login details={handleFunction}/>}/>  
    <Route path="/Home" element={<Home/>}/> 
       <Route path='/SignUp' element={<SignUp/>}/>    
    <Route path='/profile' element={<Profile/>} />  
      <Route path='/DeliveryPincode' element={<DeliveryPincode/>} /> 
       <Route path='/DeliveryInternation' element={<DeliveryInternation/>}/>  
      <Route path='/Parcel' element={<Parcel/>}/>   
     <Route path='/Bookings' element={<Bookings/>}/> 
       <Route path='/BookingsView'element={<BookingsView/>}/>     

        <Route path = '/PaymentDetails' element = {<PaymentDetails/>}/>   
     <Route path = '/Services' element = {<Services/>}/>    
    <Route path = '/parcel' element = {<Parcel/>}/>  
     <Route path = '/Setaddress' element = {<Setaddress/>}/>    
 <Route path = '/Paymentoptions' element = {<Paymentoptions/>}/>   
   <Route path = '/Success' element = {<Success/>}/>  
   {/* <Route path = '/Home' element = {<Home/>}/>   */}
   {/* <Route path = '/Booking' element = {<Bookings/>}/>  */}
   <Route path = '/BookingsView' element = {<BookingsView/>}/>  
   {/* <Route path = '/Contact' element = {<Contact/>}/> */}
   <Route path = '/Contact' element = {<Contact/>}/>  
    </Routes>   
   {/* </BrowserRouter>    
     )}
         {
          roleData.role === "is_superuser" &&          (
            <BrowserRouter> */}
          <Routes>  
          
 <Route path='/AdminHome' element={<AdminHome/>} />     
       <Route path='/Quickport' element={<Quickport/>}/> 
           <Route path='/Driverinformation' element={<Driverinformation/>}/>  
          <Route path='/Drivers' element={<Drivers/>}/>          
  <Route path='/Compliants' element={<Compliants/>} />          
 <Route path='/Pending' element={<Pending/>} />     
      <Route path='/Picked' element={<Picked/>}/>    
      <Route path='/In_Process' element={<In_Process/>}/>   
     <Route path='/Delivered' element={<Delivered/>}/>       
  <Route path='/Total'element={<Total/>}/>           
 <Route path='/Logout'element={<Logout/>}/>         
 </Routes>        
   {/* </BrowserRouter>       
   )
         }

         {roleData.role === "is_staff" && (
         <BrowserRouter>  */}

         <Routes>       
    {/* <Route path='/'  /> */}

          <Route path='/DriverOrder' element={<DriverOrder/>} />  
         <Route path = '/Driverdetails' element = {<Driverdetails/>}/>        
    <Route path='/DriverPickedOrder' element={<DriverPickedOrder/>} />    
       <Route path = '/Driverpickedorderdetails' element = {<Driverpickedorderdetails/>}/>   
        </Routes>     
     </BrowserRouter>    
     {/* )} */}
   {/*    */}
         {/* {!arr?<BrowserRouter> 
   <DriversAdmin/>  
  <Routes>    
  <Route path='/'  />   
  <Route path='/DriverOrder' element={<DriverOrder/>} />
      <Route path = '/Driverdetails' element = {<Driverdetails/>}/>    
   <Route path='/DriverPickedOrder' element={<DriverPickedOrder/>} />     
 <Route path = '/Driverpickedorderdetails' element = {<Driverpickedorderdetails/>}/>  
    </Routes>   
  </BrowserRouter>   
 :null} */}
{/* <Services/> */}
{/* <Bookings/> */}
{/* <PaymentDetails/> */}
 {/* <DriverOrder/>   */}
 {/* <Driverdetails/>  */} 
{/* <DriverPickedOrder/> */}
{/* <Totalorders/> */}
{/* <Driversucess/> */}
    </div>  );
}
export default App;