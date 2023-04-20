import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../components/SignUp.css'
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const values = {
    username: "", password: "", email: " ", first_name: "",
    last_name: "", confirmpassword: ""
  };
  const [formvalues, setformvalues] = useState(values)
  const [arr, setarr] = useState([])
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [username, setusername] = useState("")
  const [first_name, setfirst_name] = useState("")
  const [last_name, setlast_name] = useState("")
  const [confirmpassword, setconfirmpassword] = useState("")
  const navigate = useNavigate()

  const handlechange = (e) => {
    console.log(e.target);
    const { name, value } = e.target;
    setformvalues({ ...formvalues, [name]: value })
    console.log(formvalues);
  }

  const OnSignUp = (e) => {
    e.preventDefault();
    let obj = {
      username: formvalues.username,
      first_name: formvalues.first_name,
      last_name: formvalues.last_name,
      password: formvalues.password,
    }
    console.log(obj);
    setemail("")
    setpassword("")
    setusername("")
    setfirst_name("")
    setlast_name("")
    setconfirmpassword("")
    arr.push(obj)
    console.log(arr)
    axios.post('http://192.168.2.236:8000/api/signup/', obj,
    )
      .then((res) => {

        console.log(res);

         console.log(res.data);

      },[]);
      navigate('/')
  }

  return (

    <div class="containersignup ">
      <div class="row">
        <div class="col-sm-8"></div>
        <div class="col-sm-4 col-md-6 col-lg-4 mx-auto mb-4">
          <div class="card border-0 shadow rounded-3 my-4 mb-4">
            <div class="card-body p-4 p-sm-5 ">
              <h5 class="card-title text-center mb-5 fw-light fs-4">Sign Up</h5>
              <form>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput"
                    placeholder="UserName"
                    name='username'
                    value={formvalues.username}
                    onChange={handlechange}
                  />
                  <label for="floatingInput">UserName</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"
                    name='email'
                    value={formvalues.email}
                    onChange={handlechange}
                  />
                  <label for="floatingInput">Email address</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="FirstName"
                    name='first_name'
                    value={formvalues.first_name}
                    onChange={handlechange}
                  />
                  <label for="floatingInput">FirstName</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="LastName"
                    name='last_name'
                    value={formvalues.last_name}
                    onChange={handlechange}

                  />
                  <label for="floatingInput">LastName</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
                    name='password'
                    value={formvalues.password}
                    onChange={handlechange}
                  />
                  <label for="floatingPassword">Password</label>
                </div>
                <div class="form-floating mb-3">
                  <input type="password" class="form-control" id="floatingPassword" placeholder="ConfirmPassword"
                    name='confirmpassword'
                    value={formvalues.confirmpassword}
                    onChange={handlechange}
                  />
                  <label for="floatingPassword">ConfirmPassword</label>
                </div>


                <div class="d-grid">
                  <button class="btn btn-primary btn-login text-uppercase fw-bold" type="submit" onClick={OnSignUp}>

                    {/* <Link to='/SignIn' className='SignUp'> */}

                    Submit

                    {/* </Link> */}

                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default SignUp
