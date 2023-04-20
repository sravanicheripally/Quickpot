import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "../components/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { sendDeliveryrole } from '../Redux/Actions';
function Bar(roles) {
  const dispath = useDispatch()
  // const value=useSelector((state)=>state.display.DeliveryRole)
  //   console.log(value,"iam payment options")
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
    navigate();
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="primary">
        <Container className="Login">
          <Navbar.Brand  style={{ color: "yellow" }}>
            QuickPort 365
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="#Home" style={{ color: 'beige' }}><Link to="/Profile" className='SignIn'>Home</Link></Nav.Link> */}
              {/* <Nav>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title="profile"
                  style={{ color: "beige" }}
                >
                  <NavDropdown.Item>
                    <Link to="/Profile" className="SignIn">
                      profile
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav> */}
              <Nav.Link style={{ color: "beige" }}>
              <Link to="/Home" className="SignIn" >
              Home
                </Link>
              </Nav.Link>
              <Nav.Link style={{ color: "beige" }}>
              <Link to="/Profile" className="SignIn" >
              ToBook
                </Link>
              </Nav.Link>
              <Nav.Link style={{ color: "beige" }}>
              <Link to="/BookingsView" className="SignIn" onClick={handleLogin}>
              Bookings
                </Link>
                
              </Nav.Link>
              <Nav.Link  style={{ color: "beige" }}>
              <Link to="/Contact" className="SignIn" onClick={handleLogin}>
              Contact
                </Link>
          
              </Nav.Link>
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
  );
}
export default Bar;
