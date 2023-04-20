import axios from 'axios'
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../components/Drivers.css'
import { Link } from 'react-router-dom'
function Drivers() {
    const [ApiDetails, setApiDetails] = useState([])
    const [show, setShow] = useState(false);
    const [arrnew, setArrnew] = useState([]);
const [select, setSelect] = useState([]);
const[phone,setPhone]=useState()
const[address,setAddress]=useState()
const[id_type,setIdtype]=useState()
const [id,setId]=useState()
    const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
    useEffect(() => {
        axios.get("http://192.168.2.236:8000/api/drivers/")
            .then(res => {
                console.log(res.data)
                setApiDetails(res.data)
            })
    }, [])
    
    const viewClicked = (index) => {
        ApiDetails.map((e1, i) => {
            setShow(true)
            if (i == index) {
               setPhone(e1.phone)
               setAddress(e1.address)
               setIdtype(e1.id_type)
            }
          })
        console.log(select);
    }
    const handleId=(e)=>{
        setId(e.target.value)
    }
    const handlePhone=(e)=>{
     setPhone(e.target.value)
    }
    const handleAddress=(e)=>{
      setAddress(e.target.value)
    }
    const handleidtype=(e)=>{
      setIdtype(e.target.value)
    }
    const handlesubmit=()=>{

    }
    return (
      <div className="responstable">
       
     <h1 className="Driverd"> <span>Driver</span> <span>Details</span>&nbsp;&nbsp;&nbsp;

     <span class="blue"></span><span> <Link to='/Driverinformation'>
  <button onClick={handlesubmit}>Add Driver</button>
  </Link></span>&nbsp;&nbsp;</h1>
            <Table >
                <thead>
                    <tr >
                   
                        <th>Id</th>
                        <th data-th="Driver details"><span>Name</span></th>
                        <th>govt_id</th>
                        <th>View Details</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        ApiDetails.map((e,index) => (
                            <tr key={index}>
                                <td>{e.id}</td>
                                <td>{e.name}</td>
                                {/* <td>phone:{e.phone}</td>
                                <td>address:{e.address}</td>
                                <td>id_type:{e.id_type}</td> */}
                                <td>{e.govt_id}</td>
                                <td><button  onClick={() => viewClicked(index)} className="Driverview">View Details</button></td>
                            </tr>
                        ))}
                </tbody>
            </Table>
            <div>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <form>
   
     <ul>  Phone  <input value={phone} onChange={handlePhone}/></ul>
     <ul> Address<input value={address} onChange={handleAddress}/></ul>
     <ul>Id_type<input value={id_type} onChange={handleidtype}/></ul>
       </form>
        </Modal.Body>
      </Modal>
            </div>
           </div>
    )
}
export default Drivers