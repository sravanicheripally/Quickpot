import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../components/AdminNavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendDeliveryrole } from '../Redux/Actions';
function DriversAdmin(roles) {
  const dispath = useDispatch()
  console.log(roles);

  
  const isUser=useSelector((state)=>state.display.Deliveryrole)
  console.log(isUser);
  const navigate = useNavigate();
  const handleLogout = (e) => {
    dispath(sendDeliveryrole({user:""}))
    localStorage.setItem('role',"");
    localStorage.setItem('user', "");
    navigate("/");
  };
  const handleLogin = (e) => {

  };
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary"   >
        <Container className="Login" >
          <Navbar.Brand href="#home" style={{ color: 'yellow' }} >
            QuickPort 365</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link  style={{ color: 'beige' }}> 
            <Link to="/DriverOrder" className="SignIn" onClick={handleLogin}>
            Orders
                </Link>
                </Nav.Link>
              <Nav.Link style={{ color: 'beige' }}> 
              <Link to="/DriverPickedOrder" className="SignIn" onClick={handleLogin}>
              Picked order
                </Link>
                </Nav.Link>
              <Nav.Link href="#Complaints" style={{ color: 'beige' }}>
              </Nav.Link>
            </Nav>
            <Nav>
              {/* {val.state ? */}

                <Form className="d-flex" id="navdropdown" >
                <NavDropdown title="Profile" id="navbarScrollingDropdownProfile"  >
                  
                    <NavDropdown.Item >My Account</NavDropdown.Item>
                    <NavDropdown.Item >Terms & Condition</NavDropdown.Item>
                    <NavDropdown.Item >About Us</NavDropdown.Item>
                    <NavDropdown.Item >Contact Us</NavDropdown.Item>
                    <NavDropdown.Item >Privarcy Policy</NavDropdown.Item>
                    <NavDropdown.Divider />
                    {/* <NavDropdown.Item 
                    // onClick={handleLogout}
                    >Logout</NavDropdown.Item> */}
                  </NavDropdown>
                </Form>
                :
            
              </Nav>
              <Nav>
            
            {isUser.user !== "" ? (
              <Form className="d-flex" id="navdropdown">
                <NavDropdown
                  title="LogOut"
                  id="navbarScrollingDropdown"
                  align={{ lg: "end" }}
                >
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item>Delete My Account</NavDropdown.Item>
                </NavDropdown>
              </Form>
            ) : (
              <Nav.Link eventKey={2} id="items">
                <Link to="/" className="SignIn" onClick={handleLogin}>
                  Login
                </Link>
              </Nav.Link>
            )}
          </Nav>
             
          </Navbar.Collapse>
        </Container>
       
      </Navbar>
   
    </div>
  )
}

export default DriversAdmin
