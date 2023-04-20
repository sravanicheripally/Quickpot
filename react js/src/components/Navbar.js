import React from 'react'
import AdminNavbar from './AdminNavbar';
import Bar from './Bar';
import DriversAdmin from './DriversAdmin';
import { useSelector } from 'react-redux';
export default function Navbar({role}) {

    const roles= localStorage.getItem('role')
    const users= localStorage.getItem('user')
    // setRoleValues(a)
    // })
    // const {user}=useSelector((state)=>state.display.Deliveryrole)
  return (
    <div> 
      {users !== ""  &&(
<>
{roles == 'is_active' &&  <Bar roles={role} />}
      {roles == 'is_superuser' &&   <AdminNavbar/>}
      {roles == 'is_staff' &&  <DriversAdmin/>} 
</>
      )}    
   
    </div> 
 )
}