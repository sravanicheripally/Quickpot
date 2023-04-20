import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import '../components/AdminNavbar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendDeliveryrole } from '../Redux/Actions';
function AdminNavbar(roles) {
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
       <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary"   >
        <Container className="Login" >
          <Navbar.Brand href="#AdminHome" style={{ color: 'yellow' }} >
        QuickPort 365</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#OrdersDashboard" style={{ color: 'beige' }}>
                <Link to="/Quickport" className='linkstyle'>OrdersDashboard</Link></Nav.Link>
              <Nav.Link href="#Drivers" style={{ color: 'beige' }}>
                
              <Link to="/Drivers" className="linkstyle">  Drivers</Link>
                
                </Nav.Link>
              <Nav.Link href="#Complaints" style={{ color: 'beige' }}>
                <Link to="/Compliants" className="linkstyle">Complaints</Link></Nav.Link>
            </Nav>
            <Nav>
              {/* {val.state ? */}

                {/* <Form className="d-flex" id="navdropdown" >
                <NavDropdown title="Profile" id="navbarScrollingDropdownProfile"  >
                  
                    <NavDropdown.Item >My Account</NavDropdown.Item>
                    <NavDropdown.Item >Terms & Condition</NavDropdown.Item>
                    <NavDropdown.Item >About Us</NavDropdown.Item>
                    <NavDropdown.Item >Contact Us</NavDropdown.Item>
                    <NavDropdown.Item >Privarcy Policy</NavDropdown.Item>
                    <NavDropdown.Divider />
                 
                  </NavDropdown>
                </Form> */}
                :
            
              </Nav>
              <Nav>
            
            {isUser.user !== "" ? (
              <Form className="d-flex" id="navdropdown">
                <NavDropdown
                  title="Logout"
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
   
  )
}

export default AdminNavbar
