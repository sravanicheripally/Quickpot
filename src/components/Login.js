import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router";
import "../components/Login.css";
import { Col, Row } from 'react-bootstrap';
import { useDispatch,useSelector } from "react-redux";
import {sendusername,sendDeliveryrole}from '../Redux/Actions';
function Login(props) {
  const {state} = useLocation();
  console.log(state)
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [arr, setarr] = useState([]);
  const [bool, setBool] = useState(true);
  const [errorMsg,setErrorMsg]=useState("")
  const navigate=useNavigate()
  // const value=useSelector((state)=>state.display.Deliveryrole)
  //   console.log(value)
  const changeusername = (e) => {
    setusername(e.target.value);
    // console.log(e.target.value);
  };
  const changepassword = (e) => {
    setpassword(e.target.value);
    // console.log(e.target.value)
  };
const dispath= useDispatch()
  const Onlogin = (e) => {
    e.preventDefault();
    let val = {
      username: username,
      password: password,
    };
    dispath(sendusername(val.username))
     console.log(dispath);
    setusername("");
    setpassword("");
    arr.push(val);
    console.log(arr);
    console.log(bool);
    axios
      .post(
        "http://192.168.2.236:8000/api/login/",
        val
        // {
        //   headers: {
        //     'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZXhwIjoxNjcxNjkwMjczLCJpYXQiOjE2NzE2ODk5NzN9.KDqTKI0rtZxNwigKkoeiOodGOl0lZy1ay9By-SbTAIs",
        //   }
        // }
      )
      .then((res) => {
        props.details(res.data);
        dispath(sendDeliveryrole(res?.data?.data))
        localStorage.setItem('role',res.data.role);
      localStorage.setItem('user', res.data.data.user);
      localStorage.setItem('user_id', res.data.user_id)
      setErrorMsg('')
       navigate("/Home")
      // navigate("/")
      //  console.log(res.data);
      }).catch((error)=>{setErrorMsg("Invalid username") })
  };
  return (
    <div className="Login">    <div class="containersignin ">  <div class="row">     <div class="col-sm-9 col-md-10 col-lg-5 mx-auto mb-5">        <div class="card border-0 shadow rounded-3 my-5 mb-5">            <div class="card-body  ">  <h5 class="card-title text-center mb-5 fw-light fs-5">                 Sign In
                </h5>        <form>               <div class="form-floating mb-3">                <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      onChange={changeusername}
                      value={username}
                    />   <label for="floatingInput">username</label>           </div>  <div class="form-floating mb-3">              <input
                      type="password"
                      class="form-control"
                      id="floatingPassword"
                      placeholder="Password"
                      autoComplete="on"
                      onChange={changepassword}
                      value={password}
                    />    <label for="floatingPassword">Password</label>       </div> <div class="form-check mb-3">                 <input
                      class="form-check-input"
                      type="checkbox"
                      id="rememberPasswordCheck"
                    /><label class="form-check-label" for="rememberPasswordCheck">                      Remember password
                    </label>              </div> <Row>                    {" "}
                    <Col className="forgot-password text-right mb-2 ">                      {" "}
                      Forgot<a href="#"> Password ?</a>{" "}
                    </Col>{" "}
                    <Col className="forgot-password text-right mb-2 ">                      {" "}
                    <Link to="/SignUp">SignUp</Link> {" "}
                    </Col>{" "}
                  </Row> <div class="d-grid">  <button
                      class="btn btn-primary btn-login text-uppercase fw-bold"
                      type="submit"
                      onClick={Onlogin}
                    >                        Login
   </button>   {errorMsg && (<div style={{color:'red'}}> {errorMsg}</div>)}
               </div>              </form>         </div>    </div> </div></div>  </div>  </div>);
}
export default Login;